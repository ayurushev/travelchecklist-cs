app.controller('TravelToolbarController', ['$scope', '$state', 'Travels', function($scope, $state, Travels) {
  $scope.Travels = Travels;

  $scope.addStep = function() {
    Travels.addStep();
  }

  $scope.reload = function() {
    $state.reload();
  }

  $scope.save = function() {
    //console.log('SAVE!');
    if (Travels.save()) {
      console.log('travels: saved.');
    }
  }
}]);
