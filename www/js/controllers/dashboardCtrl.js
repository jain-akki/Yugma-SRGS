angular.module('yugma')

.controller('DashCtrl', function($state, $scope, $ionicPopup, customService, authService, USER) {

	$scope.logout = function() {
		
		customService._showConfirm() .then(function(res) {
	 		if (res) {
		 		authService.logout();
		    	$state.go("login");
		    }
		});
	};

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	
	$scope.chat = Chats.get($stateParams.chatId);

})

.controller('AccountCtrl', function($scope, USER) {

	$scope.settings = {
		enableFriends: true
	};

	console.log("parentName", USER.parentName())
	$scope.parentName = USER.parentName();

})
