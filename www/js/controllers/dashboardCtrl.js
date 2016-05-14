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