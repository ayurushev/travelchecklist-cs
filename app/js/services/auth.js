app.factory('Auth', ['$http', '$mdToast', '$rootScope', 'Session', function($http, $mdToast, $rootScope, Session) {
  return {
    login: function(username, password, callback) {
      $http.post('https://mercloud.com:4136/api/authenticate', { username: username, password: password }).then(function(response) {
        if (response.data.success) {
          Session.set({
            username: username,
            token: response.data.token
          });
          $rootScope.$broadcast('auth-logged-in');
          $mdToast.show($mdToast.simple({ textContent: 'Выполнен вход (' + username + ')' }));
          callback(true);
        } else {
          callback(false);
        }
      }, function(error) {
        callback(error);
      });
    },
    logout: function() {
      Session.flush();
      $rootScope.$broadcast('auth-logged-out');
      $mdToast.show($mdToast.simple({ textContent: 'Выполнен выход' }));
    }
  };
}]);
