(function () {

    'use strict';

    angular.module('yugma')

    .controller('managementTeacherCloseSuggestionCtrl',

    function ($scope, $state, $stateParams, USER, managementSuggestionService, customService, $ionicHistory) {

        var vm = this;

        console.log('managementTeacherCloseSuggestionCtrl');

        vm.goBack = function () {
            $ionicHistory.goBack();
        }

        function closeTeacherSuggestion(data) {
            customService._off();
            managementSuggestionService.closeTeacherSuggestion(data).then(function (response) {
                if ($stateParams.name === "assignTeacher") {
                    $state.go("management.assignComplaint.assignTeacherComplaint", {}, { reload: true });
                } else {
                    $state.go("management.suggestion.teacherSuggestion", {}, { reload: true });
                }
            });
        }

        vm.closeSuggestion = function (data1) {

            customService._on();

            angular.extend(data1, {
                comment: "ClosedReason: " + data1.comment,
                csaId: $stateParams.suggestionId,
                teacherId: USER.parentId()
            });

            managementSuggestionService.closeTeacherSuggestion(data1).then(function (response) {

            });
        }

    });
})();