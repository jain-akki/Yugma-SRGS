(function () {

    'use strict';

    angular.module('yugma')

    .controller('suggestionByParentForOtherCtrl', function ($scope, USER, suggestionService, customService) {

        var vm = this;

        console.log('suggestionByParentForOtherCtrl');

        customService._on();

        $scope.otherSuggestions = [];

        suggestionService.getOtherSuggestion(USER.parentId()).then(function (response) {
            customService._off();
            $scope.otherSuggestions = response;
            if ($scope.otherSuggestions.length === 0) {
                $("#cmplOtherEmpty").css("display", "inherit");
            }
        });

        $scope.doRefresh = function () {

            suggestionService.getOtherSuggestion(USER.parentId()).then(function (response) {
                $scope.otherSuggestions = response;
                $scope.$broadcast('scroll.refreshComplete');
            });

        };
    })
})();