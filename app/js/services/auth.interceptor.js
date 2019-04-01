app.factory('AuthInterceptor', ['$q', 'Session', function($q, Session) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if (Session.isAuthenticated()) {
        config.headers.Authorization = 'Bearer ' + Session.data.token;
      }
      return config || $q.when(config);
    },
    response: function(response) {
      if (response.data && response.data.success === false) {
        Session.flush();
      }
      return response || $q.when(response);
    },
    responseError: function(response) {
      if (response.status === 403) {
        Session.flush();
      }
      return $q.reject(response);
    }
  };
}]);
