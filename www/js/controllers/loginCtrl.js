angular.module('yugma')

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, customService, authService) {

    $ionicPlatform.registerBackButtonAction(function (event) {

		if ($state.current.name === "tab.dash") {
			// remove this line to disable the exit
			navigator.app.exitApp();
		} else {
			navigator.app.backHistory();
		}

    }, 100);

	$scope.parentsCredentials = {
		contact : "",
		otp: "",
		displayUserTextbox : true
	};

	$scope.category ={
       state : "parents"
   	};

	$scope.loginCategory = function() {

		if ($scope.category.state === "parents") {
			$state.go("login.parents");
		} else {
			$state.go("login.managements");
		}

	}

	$scope.isFormDisabled = function(){
		return this.form.$invalid;
	}

	var parentsData = {};

	$scope.authenticateUser = function(data) {

		customService._on();

		authService.getOtp(data.contact) .then(function(data) {

			customService._off();

			$scope.parentsCredentials = {};

			if (typeof data === "object") {

				$scope.parentsCredentials.displayUserTextbox = false;

				parentsData = {
					parentId: data.id,
					parentOtp: data.otp,
					parentName: data.name
				};
				
			} else {
				$scope.parentsCredentials.displayUserTextbox = true;
			}
			
		});
	};

	$scope.otpVerification = function(data) {

		customService._on();

		authService.verifyOtp(data.otp, parentsData) .then(function(authenticated) {

			customService._off();
			$scope.parentsCredentials = {};
			$scope.parentsCredentials.displayUserTextbox = true;
			$scope.category.state = "parents";
			$state.go("tab.dash", {}, {reload: true});

		}, function(err) {

			customService._off();
			
			var Data = {
				title: "Login Failed",
				template: "Otp doesn't match."
			}
			
			customService._showAlert(Data) .then(function(res) {
				if (res) {
					$scope.parentsCredentials = {};
					$scope.parentsCredentials.displayUserTextbox = true;
				}
			});

		});
	}

})