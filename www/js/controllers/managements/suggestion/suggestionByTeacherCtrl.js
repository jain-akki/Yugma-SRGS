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

                $scope.suggestionsByTeacher = response;

                customService._off();

                console.log("TeacherSuggestions Object: ", response);

                if ($scope.suggestionsByTeacher.length === 0) {
                    $("#cmplEmpty").css("display", "inherit");
                }

            });
        });

})();