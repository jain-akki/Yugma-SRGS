angular.module('yugma')
	.controller('gcmController', function ($scope, $http, $ionicPopup, $cordovaNetwork, $rootScope, $ionicPush, $ionicPlatform) {

		//..............check n/w status.................//

		document.addEventListener("deviceready", function () {

			$scope.network = $cordovaNetwork.getNetwork();
			$scope.isOnline = $cordovaNetwork.isOnline();

			$scope.$apply();

			// listen for Online event
			$rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
				$scope.isOnline = true;
				$scope.network = $cordovaNetwork.getNetwork();

				$scope.$apply();
			})

			// listen for Offline event
			$rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
				// console.log("got offline");
				// alert("offline");

				$ionicPopup.confirm({
					title: 'No Internet Connection',
					content: 'Sorry, no Internet connectivity detected.'
				});

				$scope.isOnline = false;
				$scope.network = $cordovaNetwork.getNetwork();

				$scope.$apply();
			})

		}, false);


		//.......registering for push notification..........//

		/*var push = new Ionic.Push({});
	
		 push.register(function(token) {
				//Log out your device token (Save this!)
			   console.log("Got Token:",token.token);
			   alert("Got Token:"+ token.token);
			 
			   var parentId = "70";
			   $scope.saveGcmToken( parentId, token);
		});*/

		$ionicPlatform.ready(function () {
			$ionicPush.init({
				"debug": true,
				"onNotification": function (notification) {

					var payload = notification.payload;
					console.log(notification, payload);
					alert("notification   " + JSON.stringify(notification));
				},

				"onRegister": function (data) {
					alert(data.token);
					var parentId = "70";
					$scope.saveGcmToken(parentId, data);
				},

				"pluginConfig": {
					"android": {
						'badge': true,
						'sound': true,
						'alert': true,
						"icon": "icon",
						"iconColor": "#948438"
					},
					"ios": {
						"badge": true,
						"sound": true,
						"alert": true
					}
				}
			});

			$ionicPush.register({
				canShowAlert: true, //Can pushes show an alert on your screen?
				canSetBadge: true, //Can pushes update app icon badges?
				canPlaySound: true, //Can notifications play a sound?
				canRunActionsOnWake: true, //Can run actions outside the app,

			});
		});


		$scope.saveGcmToken = function (parentId, token) {
			var data = {};
			angular.extend(data, {
				id: parentId,
				name: token.token
			});

			alert("data" + JSON.stringify(data));
			$http({
				method: 'PUT',
				contentType: 'application/json',
				dataType: 'json',
				data: data,
				url: "http://nxtlife-sansha.cloud.cms500.com/school/add-app-token"
			}).success(function (response) {
				alert("bbbbbbbb" + JSON.stringify(response));
			}).error(function (response) {
				alert("AAAAAAAAA" + JSON.stringify(response));
			});
		}
	});