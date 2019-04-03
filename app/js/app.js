/*
	Travel Checklist (Cloud Storage)
	(c) 2019 Andrei /Lavar/ Yurushev
	https://lavar.mercloud.com
*/
var app = angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'templates']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');

	$stateProvider.state('account', {
		url: '/account',
		protected: true,
		views: {
			'': {
				templateUrl: 'partials/account.html',
				controller: 'AccountController'
			}
		},
		resolve: {
			data: ['$http', 'API_URL', function($http, API_URL) {
				return $http.get(`${ API_URL }/account/`).then(function(response) {
					if (response.data.success === true) {
						return response.data.user;
					}
				});
			}]
		}
	});

	$stateProvider.state('travels', {
		url: '/',
		protected: true,
		views: {
			'': {
				templateUrl: 'partials/travels.html',
				controller: 'TravelsController'
			},
			'toolbar': {
				templateUrl: 'partials/travels.toolbar.html',
				controller: 'TravelsToolbarController'
			}
		},
		resolve: {
			data: ['Travels', function(Travels) {
				return Travels.get();
			}]
		}
	}).state('travel', {
		url: '/?id',
		protected: true,
		views: {
			'': {
				templateUrl: 'partials/travel.html',
				controller: 'TravelController'
			},
			'toolbar': {
				templateUrl: 'partials/travel.toolbar.html',
				controller: 'TravelToolbarController'
			}
		},
		resolve: {
			data: ['$stateParams', 'Travels', function($stateParams, Travels) {
				return Travels.get($stateParams.id);
			}]
		}
	});

	$urlRouterProvider.otherwise('/');

	$mdThemingProvider.theme('yellow-dark', 'default').primaryPalette('yellow').dark();
}]);

app.value('API_URL', 'https://mercloud.com:4136/api');

app.run(['$rootScope', '$state', '$transitions', '$mdDialog', 'Session', function($rootScope, $state, $transitions, $mdDialog, Session) {
	$transitions.onBefore({}, function(transition) {
		// transition can be aborted here and $state.current will have
		// abstract state then with no useful information, so we have
		// to save transition data before that to global $rootScope
		// variable to call it later to invoke login dialog for example
		$rootScope.$transition = {
			to: transition.to(),
			params: transition.params()
		};

	  if (transition.to().protected) {
			if (!Session.isAuthenticated()) {
				$mdDialog.show({
	      	templateUrl: 'partials/login.html',
					controller: 'LoginController',
	      	targetEvent: event
	    	}).then(function(result) {
					if (result.loggedIn === true) {
						// continue transition
						transition.run();
					}
				}, function() {
				});
				// 'pause' transition
				return false;
			}
	  }
  });
}]);
