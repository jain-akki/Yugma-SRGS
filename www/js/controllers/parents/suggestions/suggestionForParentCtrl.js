(function () {
    
    'use strict';

    angular.module('yugma')

    .controller('suggestionForParentCtrl',

    function ($scope, suggestionService, USER, customService) {

        var vm = this;

        console.log('suggestionForParentCtrl');

        $scope.suggestionsByTeacher = [];

        suggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {
            customService._off();
            $scope.suggestionsByTeacher = response;
            console.log('suggestion: ', response);
        });

    })

})();