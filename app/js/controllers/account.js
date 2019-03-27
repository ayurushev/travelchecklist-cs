app.controller('AccountController', ['$scope', '$http', '$state', 'API_URL', 'data', function($scope, $http, $state, API_URL, data) {
  $scope.data = data;

  $scope.update = function() {
    $http.put(`${ API_URL }/account/`, { name: $scope.data.name }).then(function(response) {
      if (response.data.success === true) {
        $state.reload();
      }
    }, function() {
    });
  }
}]);
