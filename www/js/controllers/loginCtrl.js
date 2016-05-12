angular.module('yugma')

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService, $ionicPlatform) {

	$scope.data = {};

    $ionicPlatform.registerBackButtonAction(function (event) {

		if ($state.current.name === "tab.dash") {

			// remove this line to disable the exit
			navigator.app.exitApp();

		} else {

			navigator.app.backHistory();

		}

    }, 100);

	$scope.login = function(data) {
		AuthService.login(data.username, data.password)
			.then(function(authenticated) {
				$scope.data = {};
				$state.go("tab.dash", {}, {reload: true});
			}, function(err) {
				
				var alertPopup = $ionicPopup.alert({
					title: "Login Failed",
					template: "Please check your credentials."
				});
				alertPopup.then(function(res) {
			 		$scope.data = {};
				});
			});
	}

})