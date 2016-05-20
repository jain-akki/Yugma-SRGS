angular.module('yugma')

	.controller('DashCtrl', function ($state, $scope, $ionicPopup, customService, authService, USER) {

	})

	.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {

		$scope.chat = Chats.get($stateParams.chatId);

	})

	.controller('AccountCtrl', function ($scope, USER) {

		$scope.settings = {
			enableFriends: true
		};

		$scope.parentName = USER.parentName();

	})
