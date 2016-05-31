angular.module('yugma', ['ionic','ionic.service.core', 'ngCordova', 'ngStorage',  'ionic.service.push', 'yugma.controllers', 'yugma.services', 'angularMoment'])

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
                cache: false,
                templateUrl: 'templates/login/login-parents.html'
            })
            .state('login.managements', {
                url: "/managements",
                templateUrl: 'templates/login/login-managements.html',
            })
            .state('yugma', {
                url: '/yugma',
                abstract: true,
                // cache: false,
                templateUrl: 'templates/sidebar.html'
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
            .state('yugma.complaints', {
                url: '/complaints',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/complaint-tabs.html'
                    }
                }
            })
            .state('yugma.complaints.teacher-complaint', {
                url: '/teacher-complaint',
                views: {
                    'complaint-teacher': {
                        templateUrl: 'templates/parents/complaints/complaintsTeacher.html',
                        controller: 'teacherComplaintsCtrl'
                    }
                }
            })
            .state('yugma.complaints.other-complaint', {
                url: '/other-complaint',
                views: {
                    'complaint-other': {
                        templateUrl: 'templates/parents/complaints/complaintsOthers.html',
                        controller: 'otherComplaintsCtrl'
                    }
                }
            })
            .state('yugma.add-teacher-complaint', {
                url: '/add-teacher-complaint',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/addTeacherComplaint.html',
                        controller: 'addTeacherComplaintsCtrl'
                    }
                }
            })
            .state('yugma.add-teacher-comment', {
                url: '/add-teacher-comment/:complaintId/:title/:statusId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/addTeacherComment.html',
                        controller: 'addTeacherCommentCtrl as vm'
                    }
                }
            })
            .state('yugma.add-other-comment', {
                url: '/add-other-comment/:complaintId/:title/:statusId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/addTeacherComment.html',
                        controller: 'addOtherCommentCtrl as vm'
                    }
                }
            })
            .state('yugma.teacher-complaint-detail', {
                url: '/view-teacher-complaint/:complaintId',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/teacherViewComplaint.html',
                        controller: 'teacherViewComplaintCtrl'
                    }
                }
            })
            .state('yugma.other-complaint-detail', {
                url: '/view-other-complaint/:complaintId',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/otherViewComplaint.html',
                        controller: 'otherViewComplaintCtrl'
                    }
                }
            })
            .state('yugma.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/parentAccount.html',
                        controller: 'AccountCtrl as vm'
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
