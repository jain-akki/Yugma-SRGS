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

        vm.closeSuggestion = function (data) {

            customService._on();

            angular.extend(data, {
                comment: "ClosedReason: " + data.comment,
                csaId: $stateParams.suggestionId,
                teacherId: USER.parentId()
            });

            managementSuggestionService.closeTeacherSuggestion(data).then(function () {
                customService._off();
                $ionicHistory.goBack();
            });
        }

    });
})();