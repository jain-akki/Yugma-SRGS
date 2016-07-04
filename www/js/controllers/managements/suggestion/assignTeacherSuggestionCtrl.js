(function () {

    "use strict";

    angular.module('yugma')

    .controller('assignTeacherSuggestionCtrl',

    function ($scope, $state, $stateParams, USER, managementSuggestionService, customService) {

        console.log('assignTeacherSuggestionCtrl');

        var vm = this;

        var roles = USER.roles();
        customService._on();

        function getDirectorTeacherAssignSuggestion() {
            managementSuggestionService.getDirectorTeacherAssignSuggestion(USER.parentId()).then(function (response) {
                customService._off();
                console.log("getDirectorTeacherAssignSuggestion ", response);
                vm.allSuggestion = response;
            });
        }

        function getAdminTeacherAssignSuggestion() {

            managementSuggestionService.getAdminTeacherAssignSuggestion(USER.parentId()).then(function (response) {
                customService._off();
                console.log("getAdminTeacherAssignSuggestion", response);
                vm.allSuggestion = response;
            });
        }

        angular.forEach(roles, function (val, index) {

            if (val.roleId === 2 || val.roleId === 3) {

                /***** For director and principle *******/
                getDirectorTeacherAssignSuggestion();

            } else {

                /****** For admin, teacher and co-ordinator *******/
                // if(_.isEmpty(val.standardIds)) { return; }
                getAdminTeacherAssignSuggestion();
            }
        });

        vm.goBack = function () {
            $state.go("management.assignSuggestion.assignTeacherSuggestion", {}, { reload: true });
        }

        vm.viewCmpl = function () {
            $state.go("management.suggestion.teacherSuggestion", {}, { reload: true });
        }

        vm.viewAssignCmpl = function () {
            $state.go("management.assignSuggestion.assignTeacherSuggestion", {}, { reload: true });
        }

    });

})();