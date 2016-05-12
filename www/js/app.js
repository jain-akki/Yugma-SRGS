angular.module('yugma', ['ionic', 'yugma.controllers', 'yugma.services'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Set tabs position on bottom of screen in android
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl"
    })
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.run(function($rootScope, $state, AuthService, $ionicPlatform) {

  $rootScope.$on("$stateChangeStart", function (event, next, nextParams, fromState) {

    if (!AuthService.isAuthenticated()) {
      if (next.name !== "login") {
        console.log("22", next.name)
        event.preventDefault();
        $state.go("login");
      }
    }

    // if(AuthService.isAuthenticated()) {
    //   if(next.name === "login") {
    //     console.log("ASASAS")
    //     // $ionicHistory.currentView($ionicHistory.backView());
    //     $state.go('tab.dash', {}, {location: 'replace'});
    //   }
    // } 

  });

})