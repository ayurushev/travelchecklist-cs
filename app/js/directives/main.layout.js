app.directive('mainLayout', [function() {
  return {
    scope: false,
    controller: 'MainLayoutController',
    templateUrl: 'partials/main.layout.html'
  };
}]);
