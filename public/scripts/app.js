(function() {
	'use strict';
	angular
		.module('chatroom',
		[
			'ngMaterial',
			'ui.router'
		])
		.run(run);

	run.$inject = ['$window','$rootScope','$http','$state'];

	function run($window, $rootScope, $http, $state) {
		$http({
			url: '/api/validate',
			method: 'GET',
		}).success(function(user) {
			$rootScope.user = user;
			$state.go('room');
		}).error(function(data) {
			$state.go('login');
		});

		$rootScope.LogOut = LogOut;

		$rootScope.$on('login', function(event ,user) {
			$rootScope.user = user;
		});

		function LogOut() {
			$http({
				url: '/api/logout',
				method: 'GET'
			}).success(function() {
				$rootScope.user = null;
				$state.go('login');
			})
		}

	}
})();