angular.module('yugma')

.controller('DashCtrl', function($state, $scope, $ionicPopup, AuthService) {

	$scope.logout = function() {
	    
	    var logoutAlert = $ionicPopup.confirm({
	    	title: 'Attention please',
     		template: 'Are you sure want logged out?',
			cssClass: 'confirmLogout'
	    });

	    logoutAlert.then(function(res) {
	 		if (res) {
		 		AuthService.logout();
		    	$state.go("login");
		    }
		});
	};

})