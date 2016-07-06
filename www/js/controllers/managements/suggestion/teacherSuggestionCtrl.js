(function () {

    'use strict';

    angular.module('yugma')

    .controller('managementTeacherSuggestionsCtrl',

    function ($http, $scope, $state, USER, managementSuggestionService, customService, $ionicViewSwitcher, $q) {

        var vm = this;

        console.log('managementTeacherSuggestionsCtrl');

        var roles = USER.roles();

        customService._on();

        vm.allSuggestions = [];

        function getSuggestions() {
            var q = $q.defer();
            function getDirectorTeacherSuggestions() {

                managementSuggestionService.getDirectorTeacherSuggestions().then(function (response) {
                    customService._off();
                    vm.suggestions = response;
                    q.resolve(vm.suggestions);
                });

            };
            function getAdminTeacherSuggestions(id) {

                managementSuggestionService.getAdminTeacherSuggestions(id, USER.parentId()).then(function (response) {
                    customService._off();
                    vm.suggestions = response;
                    q.resolve(vm.suggestions);
                });

            };
            angular.forEach(roles, function (val, index) {

                if (val.roleId === 2 || val.roleId === 3) {
                    /***** For director and principle *******/
                    console.log('director');
                    getDirectorTeacherSuggestions();
                } else {
                    /****** For admin, teacher and co-ordinator *******/
                    if (_.isEmpty(val.standardIds)) {
                        customService._off();
                        return;
                    }
                    console.log('co-ordinator');
                    getAdminTeacherSuggestions(val.standardIds);
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

        vm.viewAssignCmpl = function () {
            $state.go("management.assignSuggestion.assignTeacherSuggestion", {}, { reload: true });
        }

        vm.goToViewTeacher = function (id, name) {
            console.log(id, name);
            $state.go("management.viewTeacherSuggestion", { suggestionId: id, name: name }, { reload: true });
        }
    });
})();