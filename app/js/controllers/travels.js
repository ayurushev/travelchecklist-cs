app.controller('TravelsController', ['$scope', '$state', '$mdDialog', '$mdToast', 'Travels', 'data', function($scope, $state, $mdDialog, $mdToast, Travels, data) {
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

  $scope.toggleDone = function(id, step) {
    Travels.toggleDone(id, step.id, step.done).then(function(response) {
      if (!response.success === true) {
        // restore value in case of network error
        step.done = !step.done;
      }
    });
  }

  $scope.remove = function(id) {
    $mdDialog.show($mdDialog.confirm({
      title: 'Удалить?',
      textContent: 'Данные будут безвозвратно удалены.',
      ariaLabel: 'Удалить',
      targetEvent: event,
      ok: 'Удалить',
      cancel: 'Отмена'
    })).then(function() {
      Travels.remove(id).then(function() {
        $mdToast.show($mdToast.simple({ textContent: 'Путешествие удалено.' }));
      });
    }, function() {
    });
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

  $scope.$on('auth-logged-out', function() {
    // clear data on logout
    $scope.travels = undefined;
  });
}]);
