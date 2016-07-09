(function () {

    'use strict';

    angular.module('yugma')

        .controller('newSuggestionCtrl', function ($scope, $state, $ionicHistory, USER, managementSuggestionService, customService) {

            var vm = this;

            $("#chld").css("display", "none");
            $("#addSuggForm").css("display", "none");

            console.log('addSuggestionCtrl');

            managementSuggestionService.getStandards().then(function (response) {
                $scope.totalStandards = response;
                console.log('standards: ', response);
            });
            $scope.suggestion = {};

            $scope.$watch("suggestion.stdSelected", function (newval, oldval) {
                if(newval){
                    console.log('selected std is: ', newval);
                    console.log('selected std is: ', newval.name);
                    $("#std").css("display", "none");
                    $("#chld").css("display", "inherit");

                    managementSuggestionService.getChildrens(newval.id).then(function (response) {
                        $scope.totalChild = response;
                        console.log('Children: ', response);
                    });
                }
            }, true);

            $scope.$watch("suggestion.chldSelected", function (newval, oldval) {
                if (newval) {
                    console.log('selected child is: ', newval);
                    $scope.studentId = newval.id;
                    $("#chld").css("display", "none");
                    $("#addSuggForm").css("display", "inherit");
                }
            }, true);

            $scope.suggestionSubmit = function (sugg) {

                customService._on();

                var finalData = {

                    teacherId: USER.parentId(),
                    studentId: $scope.studentId,
                    title: sugg.title,
                    description: sugg.description

                }

                managementSuggestionService.saveSuggestionByTeacher(finalData).then(function (response) {

                    customService._off();

                    $state.go("management.suggestionByTeacher", {}, { reload: true, notify: true });

                });
            };

            $scope.goBack = function () {
                $state.go('management.suggestionByTeacher', {}, { reload: true });
            }

            $scope.clearHistory = function () {
                $state.go($state.current, {}, { reload: true });
            }

        })

})();