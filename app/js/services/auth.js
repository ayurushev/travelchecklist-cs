app.factory('Auth', ['$http', '$mdToast', 'Session', function($http, $mdToast, Session) {
  return {
    login: function(username, password, callback) {
      $http.post('https://mercloud.com:4136/api/authenticate', { username: username, password: password }).then(function(response) {
        if (response.data.success) {
          Session.set({
            username: username,
            token: response.data.token
          });
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
      $mdToast.show($mdToast.simple({ textContent: 'Выполнен выход' }));
    }
  };
}]);
