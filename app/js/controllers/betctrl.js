define(['underscore'], function(_) {
  return ['$scope', '$http', '$routeParams', 'bets', 'socket', function($scope, $http, $routeParams, bets, socket) {

    var betId = $routeParams.betId;
    $scope.bet = _.find(bets, function(bet){return bet.id == betId});


    socket.subscribe(function(message) {
      console.log('got message', message);
      $scope.$apply();
    });

    socket.connect();

    $scope.sendMessage = function(){

      console.log('sending coucou..');
      socket.send('coucou');

    }

    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();

  }];
});