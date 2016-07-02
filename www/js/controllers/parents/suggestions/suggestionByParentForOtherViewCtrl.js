﻿(function () {

    'use strict';

    angular.module('yugma')

    .controller('suggestionByParentForOtherViewCtrl', function ($scope, $state, $stateParams, $ionicPopup, USER, customService, suggestionService) {

        $scope.cmpl = suggestionService.viewOtherSuggestion($stateParams.suggestionId);
        $scope.cmpl.date = moment($scope.cmpl.createdAt).format("DD-MM-YYYY");
        $scope.cmpl.closedDate = moment($scope.cmpl.closedOn).format("DD-MM-YYYY");

        $scope.goBack = function () {
            $state.transitionTo('yugma.suggestions.suggestionByParentForOther');
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
                    var closeSuggestionData = {
                        csaId: Number($stateParams.suggestionId),
                        id: USER.parentId(),
                        comment: "Closed Reason: " + res.comment
                    }
                    suggestionService.closeOtherSuggestion(closeSuggestionData).then(function (response) {
                        $scope.closeSuggestion.comment = "";
                        $state.go("yugma.suggestions.suggestionByParentForOther", {}, {
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
                    suggestionService.satisfyOtherSuggestion($stateParams.suggestionId).then(function (response) {
                        $state.go("yugma.suggestions.suggestionByParentForOther", {}, {
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
                    var reOpenSuggestionData = {
                        csaId: Number($stateParams.suggestionId),
                        id: USER.parentId(),
                        comment: "Re-open Reason: " + res.comment
                    }
                    suggestionService.reOpenOtherSuggestion(reOpenSuggestionData).then(function (response) {
                        $scope.reOpenSuggestion.comment = "";
                        $state.go("yugma.suggestions.suggestionByParentForOther", {}, {
                            reload: true
                        });
                    });
                }
            });
        }
    })

})();