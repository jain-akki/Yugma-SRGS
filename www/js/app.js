angular.module('yugma', ['ionic', 'ngStorage', 'yugma.controllers', 'yugma.services'])

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        /**
         * Set tabs position on bottom of screen in android
         */
        $ionicConfigProvider.tabs.position('bottom');
        
        /**
         * Hide back button text value
         */
        $ionicConfigProvider.backButton.text('');

        $stateProvider

            .state("login", {
                url: "/login",
                templateUrl: "templates/login/login.html",
                controller: "LoginCtrl"
            })
            .state('login.parents', {
                url: "/parents",
                templateUrl: 'templates/login/login-parents.html'
            })
            .state('login.managements', {
                url: "/managements",
                templateUrl: 'templates/login/login-managements.html',
            })
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/sidebar.html'
            })
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('tab.teacher-complaint', {
                url: '/teacher-complaint',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaintsTeacher.html',
                        controller: 'teacherComplaintsCtrl'
                    }
                }
            })
            .state('tab.other-complaint', {
                url: '/other-complaint',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaintsOthers.html',
                        controller: 'otherComplaintsCtrl'
                    }
                }
            })
            .state('tab.complaint-detail', {
                url: '/view-teacher-complaint/:complaintId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/teacherViewComplaint.html',
                        controller: 'teacherViewComplaintCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })
