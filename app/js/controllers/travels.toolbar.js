app.controller('TravelsToolbarController', ['$scope', '$state', 'Travels', function($scope, $state, Travels) {
  $scope.$state = $state;

  $scope.add = function() {
    return Travels.add(function(newId) {
      $state.go('travel', { id: newId });
    });
  }
}]);
