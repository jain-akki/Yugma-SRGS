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
                templateUrl: 'templates/parents/sidebar.html'
            })
            .state('yugma.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/dashboard.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('yugma.homework', {
                url: '/homework',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/homework/homework.html',
                        controller: 'homeworkCtrl as vm'
                    }
                }
            })
            .state('yugma.timetable', {
                url: '/timetable',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/timetable/timetable.html',
                        controller: 'timetableCtrl as vm'
                    }
                }
            })
            .state('yugma.foodmenu', {
                url: '/foodmenu',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/foodmenu/foodmenu.html',
                        controller: 'foodmenuCtrl as vm'
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
            .state('yugma.new-complaint', {
                url: '/new-complaint',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/newComplaint.html',
                        controller: 'newComplaintCtrl'
                    }
                }
            })
            .state('yugma.add-teacher-comment', {
                url: '/add-teacher-comment/:complaintId/:title/:statusId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/comment.html',
                        controller: 'addTeacherCommentCtrl as vm'
                    }
                }
            })
            .state('yugma.add-other-comment', {
                url: '/add-other-comment/:complaintId/:title/:statusId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/complaints/comment.html',
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
            })
            .state('management', {
                url: '/management',
                abstract: true,
                templateUrl: 'templates/managements/sidebar.html',
                controller: function ($scope, $state, customService, authService, $localStorage) {
                    $scope.roleName =  $localStorage.sessionData.employeeName;
                }      
            })
            .state('management.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/dashboard.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('management.complaints', {
                url: '/complaints',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/complaint-tab.html'
                    }
                }
                
            })            
            .state('management.complaints.teacher-complaint', {
                url: "/teacher-complaint",
                views: {
                    'complaint-teacher': {             
                        templateUrl: 'templates/managements/complaints/complaintsTeacher.html',
                        controller: 'managementTeacherComplaintsCtrl as vm'
                    }
                }
            })
            .state('management.complaints.other-complaint', {
                url: "/other-complaint",
                views: {
                    'complaint-other': {             
                        templateUrl: 'templates/managements/complaints/complaintsOthers.html',
                        controller: 'managementOtherComplaintsCtrl as vm'
                    }
                }
            })

        /**
         * When need to remove # from url uncomment below line of code
         *   $locationProvider.html5Mode(true);
         */

        $urlRouterProvider.otherwise('/yugma/dashboard');
        
        $urlRouterProvider.otherwise(function($injector, $location, $state) {

            var data = $injector.get('$localStorage');
            var state = $injector.get('$state');

            if (data.employeeName) {
                // state.go("management.complaint.teacherComplaint");
                state.go("management.dashboard");
            } else {
                state.go("yugma.dashboard");
            }

        });
    })
