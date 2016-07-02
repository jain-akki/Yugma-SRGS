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

        function closeOtherSuggestion(data) {
            customService._off();
            managementSuggestionService.closeOtherSuggestion(data).then(function (response) {
                if ($stateParams.name === "assignOther") {
                    $state.go("management.assignComplaint.assignOtherComplaint", {}, { reload: true });
                } else {
                    $state.go("management.complaints.other-complaint", {}, { reload: true });
                }
            });
        }

        vm.closeSuggestion = function (data) {

            customService._on();

            $ionicHistory.clearCache();

            angular.extend(data, {
                comment: "ClosedReason: " + data.comment,
                csaId: parseInt($stateParams.suggestionId),
                teacherId: USER.parentId()
            });

            console.log('data: ', data);

            if ($stateParams.name === "other" || $stateParams.name === "assignOther") {
                closeOtherSuggestion(data);
            } else {
                closeTeacherSuggestion(data);
            }

            $scope.suggestion = {};
        }

    });
})();