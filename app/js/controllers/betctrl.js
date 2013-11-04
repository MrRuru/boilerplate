define(['underscore'], function(_) {
  return ['$scope', '$http', '$routeParams', 'bets', 'socket', 'visitorId', 
         function($scope, $http, $routeParams, bets, socket, visitorId) {

    var betId = $routeParams.betId;
    $scope.bet = _.find(bets, function(bet){return bet.id == betId});

    $scope.visitorId = visitorId;

    var channel = socket("mybet");
    channel.connect();

    channel.subscribe(function(message) {
      console.log('got message', message);
      $scope.$apply();
    });


    var statuses = {
      "loading": "Waiting for your opponent...",

    }

    var betStatus = "loading";
    var chosenOutcome = null;

    $scope.showBets = function(){
      return true;
    };

    $scope.showStatus = function(){
      return true;
    };

    $scope.fullStatus = function(){
      return statuses[betStatus];
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