(function () {

    'use strict';

    angular.module('yugma')

    .controller('suggestionByParentForOtherCtrl', function ($scope, USER, suggestionService, customService) {

        customService._on();

        $scope.otherSuggestions = [];

        suggestionService.getOtherSuggestion(USER.parentId()).then(function (response) {

            $scope.otherSuggestions = response;

            customService._off();

            if ($scope.otherSuggestions.length === 0) {
                $("#cmplOtherEmpty").css("display", "inherit");
            }

        });

        /**
		 * When user pull complaint list 
		 * do refresh call immediately
		 */
        $scope.doRefresh = function () {

            $scope.otherSuggestions = [];

            suggestionService.getOtherSuggestion(USER.parentId()).then(function (response) {

                $scope.otherSuggestions = response;
                $scope.$broadcast('scroll.refreshComplete');

            });
        };

    })

})();