angular.module('yugma')

.value("baseUrl", "http://www.nxtlifetechnologies.com/school")

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.run(function($rootScope, $state, authService, $ionicPlatform) {

    $rootScope.$on("$stateChangeStart", function (event, next, nextParams, fromState) {
        if (!authService.isAuthenticated()) {
            if ((next.name !== "login.parents") && (next.name !== "login.managements")) {
                event.preventDefault();
                $state.go("login.parents");
            }
        }
    });

})