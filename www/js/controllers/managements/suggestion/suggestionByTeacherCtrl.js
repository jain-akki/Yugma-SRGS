(function () {

    'use strict';

    angular.module('yugma')

    .controller('suggestionByTeacherCtrl',
  
        function ($scope, $state, $ionicHistory, USER, managementSuggestionService, customService) {
  
            var vm = this;

            console.log("suggestionByTeacherCtrl");

            customService._on();

            $scope.suggestionsByTeacher = [];

            managementSuggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {
                customService._off();
                $scope.suggestionsByTeacher = response;
                if ($scope.suggestionsByTeacher.length === 0) {
                    $("#cmplEmpty").css("display", "inherit");
                }
            });

            $scope.doRefresh = function () {

                managementSuggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {
                    $scope.suggestionsByTeacher = response;
                    $scope.$broadcast('scroll.refreshComplete');
                });

            };
        });
})();