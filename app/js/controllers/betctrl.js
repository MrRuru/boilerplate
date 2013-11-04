define(['underscore'], function(_) {
  return ['$scope', '$http', '$routeParams', 'bets', 'socket', 'visitorId', 
         function($scope, $http, $routeParams, bets, socket, visitorId) {

    var betId = $routeParams.betId;
    var uId = $routeParams.uId;
    $scope.bet = _.find(bets, function(bet){return bet.id == betId});

    $scope.visitorId = visitorId;

    $scope.status = "loading";

    var channel = socket(betId + uId);
    channel.connect();

    channel.subscribe(function(message) {
      console.log('got message', message);
      $scope.status = (JSON.parse(message)).status;
      $scope.$apply();
    });


    var statuses = {
      "loading": "Loading...",
      "not_full": "Waiting for an opponent...",
      "ongoing": "Waiting until everyone answer",
      "disagree": "Did not agree, cancelled",
      "finished": "Everyone was ok. Over."
    };

    var chosenOutcome = null;

    $scope.showBets = function(){
      return $scope.status !== "loading";
    };

    $scope.showStatus = function(){
      return true;
    };

    $scope.fullStatus = function(){
      return statuses[$scope.status];
    };

    $scope.isWinning = function(){
      chosenOutcome === "winning";
    };

    $scope.isLosing = function(){
      chosenOutcome === "losing";
    };

    $scope.winBet = function(){
      console.log('winning bet..');
      chosenOutcome = "winning";
      channel.send('win');
    };

    $scope.loseBet = function(){
      console.log('losing bet..');
      chosenOutcome = "losing";
      channel.send('lose');
    };


    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();

  }];
});