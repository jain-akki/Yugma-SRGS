(function () {
    
    'use strict';

    angular.module('yugma')

    .controller('suggestionForParentCtrl',

    function ($scope, suggestionService, USER, customService) {

        var vm = this;

        console.log('suggestionForParentCtrl');

        $('#sugg').css('display', 'none');

        $scope.childs = USER.parentChilds();

        console.log('parentChilds: ', $scope.childs);

        $scope.suggestion = {};

        $scope.suggestionsByTeacher = [];

        $scope.$watch("suggestion.chldSelected", function (newval, oldval) {
            if (newval) {
                console.log('selected child is: ', newval);
                customService._on();
                $scope.studentId = newval.studentId;
                suggestionService.getSuggestionByTeacher(newval.studentId).then(function (response) {
                    customService._off();
                    $scope.suggestionsByTeacher = response;
                    console.log('suggestion: ', response);
                    $('#sugg').css('display', 'inherit');
                });
            }
        }, true);

    })

})();