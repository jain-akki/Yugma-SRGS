(function () {

    'use strict';

    angular.module('yugma')

    .controller('suggestionByParentCtrl', function ($scope, $timeout, USER, suggestionService, customService) {

        var vm = this;

        console.log('suggestionByParentCtrl');

        customService._on();

        $scope.teacherSuggestions = [];

        suggestionService.getTeacherSuggestions(USER.parentId()).then(function (response) {
            customService._off();
            $scope.teacherSuggestions = response;
            if ($scope.teacherSuggestions.length === 0) {
                $("#cmplEmpty").css("display", "inherit");
            }
        });

        $scope.doRefresh = function () {

            suggestionService.getTeacherSuggestions(USER.parentId()).then(function (response) {
                $scope.teacherSuggestions = response;
                $scope.$broadcast('scroll.refreshComplete');
            });

        };
    })
})();