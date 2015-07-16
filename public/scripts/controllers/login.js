/**
 * Email:  eteplus@163.com
 * Author: eteplus
 * Date:   15/7/15
 * Time:   14:38
 */

(function() {
	'use strict';

	angular
		.module('chatroom')
		.controller('LoginCtrl',login);

	login.$inject = ['$scope','$http','$state'];

	function login($scope, $http, $state) {
		$scope.Login = Login;

		function Login() {
			$http({
				url: '/api/login',
				method: 'POST',
				data: {
					email: $scope.email
				}
			}).success(function(user) {
				$scope.$emit('login',user);
				$state.go('room');
			}).error(function(data) {
				$state.go('login');
			});
		}
	}
})();
