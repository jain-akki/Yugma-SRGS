﻿(function () {

    'use strict';

    angular.module('yugma')

    .controller('managementOtherSuggestionCtrl',

    function ($http, $scope, $state, USER, managementSuggestionService, customService) {

        console.log('managementOtherSuggestionCtrl');
        var vm = this,
           roles = USER.roles(),
           categoryIds = [0],
           standardIds = [0];

        customService._on();

        function getDirectorOtherSuggestion() {
            managementSuggestionService.getDirectorOtherSuggestion().then(function (response) {
                customService._off();
                vm.allSuggestion = response;
            });
        }

        function getAdminOtherSuggestion() {
            managementSuggestionService.getAdminOtherSuggestion(categoryIds, standardIds).then(function (response) {
                customService._off();
                vm.allSuggestion = response;
                console.log('allSuggestion: ', vm.allSuggestion);
            });
        }

        angular.forEach(roles, function (val, index) {

            if (roles.length != index) {

                if (val.roleId === 2 || val.roleId === 3) {

                    /***************** For director and principle *********************/
                    getDirectorOtherSuggestion();

                } else {

                    /*************** For admin, teacher and co-ordinator *****************/
                    if (val.standardIds != null) {
                        standardIds = val.standardIds;
                    }

                    if (val.categoryIds != null) {
                        categoryIds = val.categoryIds;
                    }

                    if (roles.length == index + 1) {
                        getAdminOtherSuggestion();
                    }
                }
            }
        });

        vm.viewAssignCmpl = function () {
            $state.go("management.assignComplaint.assignTeacherComplaint", {}, { reload: true });
        }
    });

})();