(function () {
    
    'use strict';

    angular.module('yugma')

    .controller('suggestionForParentCtrl',

    function ($scope, suggestionService, USER, customService, $http) {

        var vm = this;

        console.log('suggestionForParentCtrl');

        customService._on();

        $scope.suggestionsByTeacher = [];

        suggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {
            customService._off();
            $scope.suggestionsByTeacher = response;
        });

        $scope.doRefresh = function () {
            
            suggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {
                $scope.suggestionsByTeacher = response;
                $scope.$broadcast('scroll.refreshComplete');
            });

        };

    })

})();