app.controller('TravelsController', ['$scope', '$state', 'Travels', 'data', function($scope, $state, Travels, data) {
  $scope.Travels = Travels;
  $scope.travels = data;

  $scope.allDone = function(travel) {
    let result = travel.steps.length > 0 ? true : false;
    angular.forEach(travel.steps, function(step) {
      if (!step.done) {
        result = false;
      }
    });
    return result;
  }

  $scope.remove = function(id) {
    Travels.remove(id);
  }

  $scope.summarize = function(steps) {
    let summary = 0;
    angular.forEach(steps, function(step) {
      if (step.done === true) {
        angular.forEach(step.items, function(item) {
          summary += item[1] || 0;
        });
      }
    });
    return summary.toFixed(2);
  }
}]);
