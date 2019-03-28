app.controller('TravelController', ['$scope', 'Travels', 'data', function($scope, Travels, data) {
  $scope.Travels = Travels;
  $scope.travel = data;

  $scope.removeStep = function(index) {
    Travels.removeStep(index);
  }

  $scope.addItem = function(stepIndex) {
    $scope.stepIndex = stepIndex;
    $scope.newItemIndex = Travels.addItem(stepIndex) - 1;
  }

  $scope.removeItem = function(stepIndex, index) {
    Travels.removeItem(stepIndex, index);
  }

  $scope.summarize = function(items) {
    let summary = 0;
    angular.forEach(items, function(item) {
      summary += item[1] || 0;
    });
    return summary.toFixed(2);
  }

  $scope.$on('auth-logged-out', function() {
    // clear data on logout
    $scope.travel = undefined;
  });
}]);
