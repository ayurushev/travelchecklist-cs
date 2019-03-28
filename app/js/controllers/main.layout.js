app.controller('MainLayoutController', ['$scope', '$state', 'Auth', 'Session', 'Travels', function($scope, $state, Auth, Session, Travels) {
  $scope.$state = $state;
  $scope.Session = Session;
  $scope.Auth = Auth;
}]);
