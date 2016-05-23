angular.module('yugma', ['ionic', 'ngStorage', 'yugma.controllers', 'yugma.services'])

    .config(function ($stateProvider, $locationProvider, $urlRouterProvider, $ionicConfigProvider) {

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
            .state('yugma', {
                url: '/yugma',
                abstract: true,
                templateUrl: 'templates/sidebar.html',
                controller: function ($scope, $state, customService, authService) {

                    $scope.logout = function () {

                        customService._showConfirm().then(function (res) {
                            if (res) {
                                authService.logout();
                                $state.go("login");
                            }
                        });
                    };

                }
            })
            .state('yugma.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dashboard.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('yugma.teacher-complaint', {
                url: '/teacher-complaint',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaintsTeacher.html',
                        controller: 'teacherComplaintsCtrl'
                    }
                }
            })
            .state('yugma.add-teacher-complaint', {
                url: '/add-teacher-complaint',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/addTeacherComplaint.html',
                        controller: 'addTeacherComplaintsCtrl'
                    }
                }
            })
            .state('yugma.other-complaint', {
                url: '/other-complaint',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaintsOthers.html',
                        controller: 'otherComplaintsCtrl'
                    }
                }
            })
            .state('yugma.complaint-detail', {
                url: '/view-teacher-complaint/:complaintId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/teacherViewComplaint.html',
                        controller: 'teacherViewComplaintCtrl'
                    }
                }
            })
            .state('yugma.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        /**
         * When need to remove # from url uncomment below line of code
         *   $locationProvider.html5Mode(true);
         */

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/yugma/dashboard');

    })
