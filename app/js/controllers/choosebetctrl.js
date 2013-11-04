define([], function() {
  return ['$scope', '$http', '$location', 'bets', function($scope, $http, $location, bets) {

    $scope.bets = bets;

    // You can access the scope of the controller from here
    $scope.welcomeMessage = 'hey this is choosebetctrl.js!';

    var uId = function(){
      return Math.floor(Math.random() * 100);
    };

    $scope.launchBet = function(bet){
      console.log('launching bet', bet);

      $location.path('/bet/'+bet.id + '/' + uId());
    };

    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();

  }];
});