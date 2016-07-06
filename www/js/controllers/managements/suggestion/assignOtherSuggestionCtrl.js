(function () {

    "use strict";

    angular.module('yugma')

    .controller('assignOtherSuggestionCtrl',

    function ($scope, $state, $stateParams, USER, managementSuggestionService, customService, $q) {

        console.log('assignOtherSuggestionCtrl');

        var vm = this;

        var roles = USER.roles();

        customService._on();

        vm.allSuggestion = [];

        function getSuggestions() {
            var q = $q.defer();
            function getDirectorOtherAssignSuggestion() {
                managementSuggestionService.getDirectorOtherAssignSuggestion(USER.parentId()).then(function (response) {
                    customService._off();
                    vm.allSuggestion = response;
                    q.resolve(vm.allSuggestion);
                });
            }
            function getAdminOtherAssignSuggestion() {
                managementSuggestionService.getAdminOtherAssignSuggestion(USER.parentId()).then(function (response) {
                    customService._off();
                    vm.allSuggestion = response;
                    q.resolve(vm.allSuggestion);
                });
            }
            angular.forEach(roles, function (val, index) {
                if (val.roleId === 2 || val.roleId === 3) {
                    /***** For director and principle *******/
                    getDirectorOtherAssignSuggestion();
                } else {
                    /****** For admin, teacher and co-ordinator *******/
                    getAdminOtherAssignSuggestion();
                }
            });
            return q.promise;
        }

        getSuggestions().then(function (response) {
            vm.allSuggestions = response;
        });

        $scope.doRefresh = function () {

            getSuggestions().then(function (response) {
                vm.allSuggestions = response;
                $scope.$broadcast('scroll.refreshComplete');
            });

        };

        vm.viewCmpl = function () {
            $state.go("management.suggestion.otherSuggestion", {}, { reload: true });
        }
        vm.viewAssignCmpl = function () {
            $state.go("management.assignSuggestion.assignOtherSuggestion", {}, { reload: true });
        }
    });
})();