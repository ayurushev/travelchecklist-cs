app.controller('TravelsToolbarController', ['$scope', '$state', 'Travels', function($scope, $state, Travels) {
  $scope.$state = $state;

  $scope.add = function() {
    Travels.add(function(newTravelId) {
      $state.go('travel', { id: newTravelId });
    });
  }
}]);
