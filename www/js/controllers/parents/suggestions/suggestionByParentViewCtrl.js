(function () {

    'use strict';

    angular.module('yugma')

        .controller('suggestionByParentViewCtrl', function ($scope, $state, $stateParams, $ionicPopup, USER, customService, suggestionService, $ionicViewSwitcher) {

            var vm = this;

            $scope.cmpl = suggestionService.viewSuggestionByParent($stateParams.suggestionId);
            $scope.cmpl.date = moment($scope.cmpl.createdAt).format("DD-MM-YYYY");
            $scope.cmpl.closedDate = moment($scope.cmpl.closedOn).format("DD-MM-YYYY");

            $scope.goBack = function () {
                $state.transitionTo('yugma.suggestions.suggestionByParentForTeacher');
            }

            $scope.closeSuggestion = {};

            $scope.closeSuggestion = function () {

                var data = {
                    template: "<textarea ng-model='closeSuggestion.comment' name='message' autofocus></textarea>",
                    title: "Why you want to close this suggestion ?",
                    scope: $scope,
                    modelName: "closeSuggestion"
                }
                
                customService._showPopup(data).then(function (res) {

                    if (res) {

                        customService._on();

                        var closeSuggestionData = {
                            csaId: Number($stateParams.suggestionId),
                            id: USER.parentId(),
                            comment: "Closed Reason: " + res.comment
                        }

                        suggestionService.closeSuggestion(closeSuggestionData).then(function (response) {

                            customService._off();
                            $scope.closeSuggestion.comment = "";
                            $ionicViewSwitcher.nextDirection('swap');
                            $state.go("yugma.suggestions.suggestionByParentForTeacher", {}, {
                                reload: true
                            });

                        });
                    }
                });
            }

            $scope.satisfySuggestion = function () {

                var data = {
                    title: 'Close suggestion permanently',
                    template: 'Glad you are happy, suggestion will be closed permanently.'
                }

                customService._showConfirm(data).then(function (res) {

                    if (res) {
                        customService._on();
                        suggestionService.satisfyTeacherSuggestion($stateParams.suggestionId).then(function (response) {
                            customService._off();
                            $state.go("yugma.suggestions.suggestionByParentForTeacher", {}, {
                                reload: true
                            });
                        })
                    }
                });
            }

            $scope.reOpenSuggestion = {};

            $scope.reOpenSuggestion = function () {

                var data = {
                    template: "<textarea ng-model='reOpenSuggestion.comment' name='message' autofocus></textarea>",
                    title: "Reason for reopening the suggestion ?",
                    scope: $scope,
                    modelName: "reOpenSuggestion"
                }

                customService._showPopup(data).then(function (res) {

                    if (res) {

                        customService._on();

                        var reOpenSuggestionData = {
                            csaId: Number($stateParams.suggestionId),
                            id: USER.parentId(),
                            comment: "Re-open Reason: " + res.comment
                        }

                        suggestionService.reOpenSuggestion(reOpenSuggestionData).then(function (response) {

                            customService._off();
                            $scope.reOpenSuggestion.comment = "";
                            $state.go("yugma.suggestions.suggestionByParentForTeacher", {}, {
                                reload: true
                            });

                        });
                    }
                });
            }
        })

})();