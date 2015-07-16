(function() {
	'use strict';

	angular
		.module('chatroom')
		.config(config);

	config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];

	function config($stateProvider, $urlRouterProvider, $locationProvider) {
		//$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('room', {
				url: '/',
				templateUrl: '../templates/room.html',
				controller: 'RoomCtrl'
			})
			.state('login', {
				url: '/login',
				templateUrl: '../templates/login.html',
				controller: 'LoginCtrl'
			})
	}
})();