app.directive('sticky', ['$mdSticky', function($mdSticky) {
  return {
    link: function(scope, element, attrs) {
      $mdSticky(scope, element);
    }
  };
}]);
