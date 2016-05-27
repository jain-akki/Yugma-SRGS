angular.module('yugma')

    // .value("baseUrl", "http://www.nxtlifetechnologies.com/school")
    .value("baseUrl", "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test")

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .run(function ($rootScope, $state, authService, $ionicPlatform, $cordovaStatusbar) {

        $rootScope.$on("$stateChangeStart", function (event, next, nextParams, fromState) {
            if (!authService.isAuthenticated()) {
                if ((next.name !== "login.parents") && (next.name !== "login.managements")) {
                    event.preventDefault();
                    $state.go("login.parents");
                }
            }
        });

        /**
         * We can change color of statusbar
         */

        if (window.StatusBar) {
            statusBar.backgroundColorByName("green");
        }

        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            alert("online");
            $scope.isOnline = true;
        });
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
            alert("offline");

            $ionicPopup.confirm({
                title: 'No Internet Connection',
                content: 'Sorry, no Internet connectivity detected.'
            });

            $scope.isOnline = false;
        })

    })