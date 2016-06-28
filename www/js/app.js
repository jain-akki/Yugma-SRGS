angular.module('yugma', ['ionic', 'ionic.service.core', 'ngCordova', 'ngStorage', 'ionic.service.push', 'yugma.controllers', 'yugma.services', 'angularMoment'])

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
            .state('yugma.suggestions', {
                url: '/suggestions',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/parents/suggestions/suggestion-tabs.html'
                    }
                }
            })
            .state('yugma.suggestions.suggestionByParent', {
                url: "/suggestionByParent",
                views: {
                    'by-parents': {
                        templateUrl: "templates/parents/suggestions/suggestionByParent.html",
                        controller: 'suggestionByParentCtrl as vm'
                     }
                }
            })
            .state('yugma.suggestions.suggestionForParent', {
                url: "/suggestionForParent",
                views: {
                    'for-parents': {
                        templateUrl: "templates/parents/suggestions/suggestionForParent.html",
                        controller: 'suggestionForParentCtrl as vm'
                     }
                }
            })
            .state('yugma.addSuggestion', {
                url: "/addSuggestion",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/parents/suggestions/addSuggestion.html",
                        controller: 'addSuggestionCtrl as vm'
                     }
                }
            })
            .state('management', {
                url: '/management',
                abstract: true,
                templateUrl: 'templates/managements/sidebar.html',
                controller: function ($scope, $state, customService, authService, $localStorage) {
                    $scope.roleName = $localStorage.sessionData.employeeName;
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
                // cache: false,
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
                        templateUrl: 'templates/managements/complaints/teacherComplaints.html',
                        controller: 'managementTeacherComplaintsCtrl as vm'
                    }
                }
            })
            .state('management.complaints.other-complaint', {
                url: "/other-complaint",
                views: {
                    'complaint-other': {
                        templateUrl: 'templates/managements/complaints/otherComplaints.html',
                        controller: 'managementOtherComplaintsCtrl as vm'
                    }
                }
            })
            .state('management.view-teacher-complaint', {
                url: '/view-teacher-complaint/:complaintId/:name',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/viewComplaint.html',
                        controller: 'managementTeacherViewComplaintCtrl as vm'
                    }
                }
            })
            .state('management.view-other-complaint', {
                url: '/view-other-complaint/:complaintId/:name',
                // cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/viewComplaint.html',
                        controller: 'managementOtherViewComplaintCtrl as vm'
                    }
                }
            })
            .state('management.edit', {
                url: '/edit',
                cache: false,
                params: {
                  obj: null  
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/editComplaint.html',
                        controller: 'managementTeacherEditComplaintCtrl as vm'
                    }
                }
            })
            .state('management.closeCmpl', {
                url: '/closeCmpl/:complaintId/:name',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/closeComplaint.html',
                        controller: 'managementTeacherCloseComplaintCtrl as vm'
                    }
                }
            })
            .state('management.add-comment', {
                url: '/add-comment',
                params: {
                  obj: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/comment.html',
                        controller: 'managementCommentCtrl as vm'
                    }
                }
            })
            .state('management.assignComplaint', {
                url: '/assignComplaint',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/assignComplaintTab.html'
                    }
                }
            })
            .state('management.assignComplaint.assignTeacherComplaint', {
                url: '/assignTeacherComplaint',
                views: {
                    'complaint-teacher': {
                        templateUrl: 'templates/managements/complaints/assignTeacherComplaints.html',
                        controller: 'assignTeacherComplaintCtrl as vm'
                    }
                }
            })
            .state('management.assignComplaint.assignOtherComplaint', {
                url: '/assignOtherComplaint',
                views: {
                    'complaint-other': {
                        templateUrl: 'templates/managements/complaints/assignOtherComplaints.html',
                        controller: 'assignOtherComplaintCtrl as vm'
                    }
                }
            })
            .state('management.assign-view-teacher-complaint', {
                url: '/assign-view-teacher-complaint/:complaintId/:name',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/complaints/viewComplaint.html',
                        controller: 'assignTeacherComplaintCtrl as vm'
                    }
                }
            })
            .state('management.homework',{
                url: '/homework',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/homework/homeworkTab.html'
                    }
                }
            })
            .state('management.homework.addHomework',{
                url: '/addHomework',
                views: {
                    'new-homework': {
                        templateUrl: 'templates/managements/homework/addHomework.html',
                        controller: 'addHomeworkCtrl as vm'
                    }
                }
            })
            .state('management.homework.dueHomework',{
                url: '/dueHomework',
                views: {
                    'due-homework': {
                        templateUrl: 'templates/managements/homework/dueHomework.html',
                        controller: 'dueHomeworkCtrl as vm'
                    }
                }
            })
            .state('management.homework.editHomework',{
                url: '/editHomework/:homeworkId',
                views: {
                    'due-homework': {
                        templateUrl: 'templates/managements/homework/editHomework.html',
                        controller: 'editHomeworkCtrl as vm'
                    }
                }
            })
            .state('management.homework.oldHomework',{
                url: '/oldHomework',
                views: {
                    'old-homework': {
                        templateUrl: 'templates/managements/homework/oldHomework.html',
                        controller: 'oldHomeworkCtrl as vm'
                    }
                }
            })
            .state('management.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/managements/managementAccount.html',
                        controller: 'managementAccountCtrl as vm'
                    }
                }
            })

        /**
         * When need to remove # from url uncomment below line of code
         *   $locationProvider.html5Mode(true);
         */

        $urlRouterProvider.otherwise('/yugma/dashboard');

        $urlRouterProvider.otherwise(function ($injector, $location, $state) {

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

    .config(function ($httpProvider) {

        $httpProvider.interceptors.push(function ($rootScope, $q, $injector) {

            return {
                request: function (config) {
                    config.timeout = 5000;
                    return config;
                },
                responseError: function (res) {

                    var state = $injector.get('$state');
                    var data = $injector.get('$localStorage');
                    var $ionicPopup = $injector.get('$ionicPopup');
                    var $ionicLoading = $injector.get('$ionicLoading');

                    var template;
                    var title;

                    switch (res.status) {
                        case 400:
                            title = "Error 400",
                            template = "Error 400: Bad request"
                            break;
                        case 403:
                            title = "Error 403",
                            template = "Error 403: Access Denied/Forbidden"
                            break;
                        case 404:
                            title = "Error 404",
                            template = "Error 404: File not found."
                            break;
                    
                        default:
                            template = "connection timeout"
                            break;
                    }

                    var alertPopup = $ionicPopup.alert({
                      title: title,
                      template: template,
                      cssClass: 'customAlert'
                    });

                    $ionicLoading.hide();

                    alertPopup.then(function(res) {
                      if (data.employeeName) {
                        state.go("management.dashboard");
                      } else {
                        state.go("yugma.dashboard");
                      }
                    });
                }
            }
        })
    })