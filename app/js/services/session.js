app.factory('Session', ['$window', function($window) {
  let init = function() {
    return 'travels_session' in $window.localStorage ? angular.fromJson($window.localStorage.getItem('travels_session')) : {};
  };
  return {
    // try to get data from localStorage on first page load
    data: init(),
    isAuthenticated: function() {
      return this.data && this.data.token && this.data.token.length > 0;
    },
    set: function(data) {
      this.data = data;
      $window.localStorage.setItem('travels_session', angular.toJson(this.data));
    },
    flush: function() {
      this.data = undefined;
      $window.localStorage.removeItem('travels_session');
    }
  };
}]);
