app.controller('TravelToolbarController', ['$scope', '$state', 'Travels', function($scope, $state, Travels) {
  $scope.$state = $state;
  $scope.Travels = Travels;
}]);
