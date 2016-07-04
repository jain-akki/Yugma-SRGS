(function () {

    "use strict";

    angular.module('yugma')

    .controller('managementTeacherEditSuggestionCtrl',

    function ($scope, $state, $stateParams, $ionicHistory, managementSuggestionService, customService, $ionicViewSwitcher) {

        customService._on();

        var vm = this;
        vm.status = false;
        vm.statusId = $stateParams.obj.status;

        var id = $stateParams.obj.cmplId,
            name = $stateParams.obj.name;

        managementSuggestionService.getAuthors().then(function (response) {
            vm.authors = response;
            angular.forEach(response, function (val, index) {
                if (val.id == $stateParams.obj.assigned) {
                    vm.selectAuthor = response[index];
                }
            })
        });

        managementSuggestionService.getPriorities().then(function (response) {
            vm.priorities = response;
            customService._off();
            angular.forEach(response, function (val, index) {
                if (val.id == $stateParams.obj.priority) {
                    vm.selectPriority = response[index];
                }
            });
        });

        vm.goBack = function () {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.goBack();
        }

        $scope.$watch("vm.selectAuthor", function (newval, oldval) {
            if (newval && oldval) {
                if (newval.id != oldval.id) {
                    vm.newAssign = newval.id;
                }
            }
        }, true);

        $scope.$watch("vm.selectPriority", function (newval, oldval) {
            if (newval && oldval) {
                if (newval.id != oldval.id) {
                    vm.newPriority = newval.id;
                }
            }
        }, true);

        function stateChangeToOther() {
            if (name === "assignOther") {
                $state.go("management.assignSuggestion.assignOtherSuggestion", {}, { reload: true });
            } else {
                $state.go("management.suggestion.otherSuggestion", {}, { reload: true });
            }
        }

        function stateChangeToTeacher() {
            if (name === "assignTeacher") {
                $state.go("management.assignSuggestion.assignTeacherSuggestion", {}, { reload: true });
            } else {
                $state.go("management.suggestion.teacherSuggestion", {}, { reload: true });
            }
        }

        function editOtherSuggestion() {

            if (vm.newAssign) {
                managementSuggestionService.assignOtherSuggestion(id, vm.newAssign).then(function (response) {
                    customService._off();
                    stateChangeToOther();
                });
            }

            if (vm.newPriority) {
                managementSuggestionService.setOtherPriority(id, vm.newPriority).then(function (response) {
                    customService._off();
                    stateChangeToOther();
                });
            }

            if (vm.status) {
                managementSuggestionService.setOtherStatus(id, 3).then(function (response) {
                    customService._off();
                    stateChangeToOther();
                });
            }

        }

        function editTeacherSuggestion() {

            if (vm.newAssign) {
                managementSuggestionService.assignSuggestion(id, vm.newAssign).then(function (response) {
                    customService._off();
                    stateChangeToTeacher();
                });
            }

            if (vm.newPriority) {
                managementSuggestionService.setPriority(id, vm.newPriority).then(function (response) {
                    customService._off();
                    stateChangeToTeacher();
                });
            }

            if (vm.status) {
                managementSuggestionService.setStatus(id, 3).then(function (response) {
                    customService._off();
                    stateChangeToTeacher();
                });
            }

        }

        vm.editSuggestion = function () {

            customService._on();
            $ionicHistory.clearCache();

            if (name === "other" || name === "assignOther") {
                editOtherSuggestion();
            } else {
                editTeacherSuggestion();
            }

        }

    });

})();