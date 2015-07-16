(function() {
	'use strict';

	angular
		.module('chatroom')
		.controller('RoomCtrl',chat);

	chat.$inject = ['$scope','socket'];

	function chat($scope,socket) {
		var vm = $scope;
		vm.messages = [];
		vm.name = '';
		vm.content = '';
		vm.sendMessage = sendMessage;
		vm.reset = reset;

		activate();

		function sendMessage() {
			if(vm.name == '' || vm.content == '') {
				return;
			}
			socket.emit('createMessage',{name:vm.name ,content:vm.content});
			vm.name = '';
			vm.content = '';
		}

		function reset() {
			vm.name = '';
			vm.content = '';
		}

		function activate() {
			socket.emit('getAllMessages');
			socket.on('allMessages',function(messages) {
				vm.messages = messages;
			});
			socket.on('messageAdded',function(message){
				vm.messages.push(message);
			});
		}
	}
})();