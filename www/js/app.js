angular.module('yugma', ['ionic', 'ngStorage', 'yugma.controllers', 'yugma.services'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Set tabs position on bottom of screen in android
    $ionicConfigProvider.tabs.position('bottom');
    
    $stateProvider
    
    .state("login", {
        url: "/login",
        templateUrl: "templates/login/login.html",
        controller: "LoginCtrl"
    })
    .state('login.parents',{
        url:"/parents",
        templateUrl: 'templates/login/login-parents.html',       
        
    })
    .state('login.managements',{
        url:"/managements",
        templateUrl: 'templates/login/login-managements.html',
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
