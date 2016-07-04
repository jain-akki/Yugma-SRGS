(function () {

    "use strict";

    angular.module('yugma')

    .controller('assignOtherSuggestionCtrl',

    function ($scope, $state, $stateParams, USER, managementSuggestionService, customService) {

        console.log('assignOtherSuggestionCtrl');

        var vm = this;

        var roles = USER.roles();
        customService._on();

        function getDirectorOtherAssignSuggestion() {
            managementSuggestionService.getDirectorOtherAssignSuggestion(USER.parentId()).then(function (response) {
                customService._off();
                console.log("getDirectorTeacherAssignSuggestion ", response);
                vm.allSuggestion = response;
            });
        }

        function getAdminOtherAssignSuggestion() {
            managementSuggestionService.getAdminOtherAssignSuggestion(USER.parentId()).then(function (response) {
                customService._off();
                console.log("getAdminTeacherAssignSuggestion", response);
                vm.allSuggestion = response;
            });
        }

        angular.forEach(roles, function (val, index) {

            if (val.roleId === 2 || val.roleId === 3) {

                /***** For director and principle *******/
                getDirectorOtherAssignSuggestion();

            } else {

                /****** For admin, teacher and co-ordinator *******/
                // if(_.isEmpty(val.standardIds)) { return; }
                getAdminOtherAssignSuggestion();
            }

        });

        vm.viewCmpl = function () {
            $state.go("management.suggestion.otherSuggestion", {}, { reload: true });
        }
        vm.viewAssignCmpl = function () {
            $state.go("management.assignSuggestion.assignOtherSuggestion", {}, { reload: true });
        }

    });

})();