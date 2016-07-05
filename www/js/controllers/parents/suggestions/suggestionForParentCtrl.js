(function () {
    
    'use strict';

    angular.module('yugma')

    .controller('suggestionForParentCtrl',

    function ($scope, suggestionService, USER, customService) {

        var vm = this;

        console.log('suggestionForParentCtrl');

        var init = true;

        $scope.suggestionsByTeacher = [];

        suggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {
            customService._off();
            
            angular.forEach(response, function (val, index) {

                if (init) {
                    $scope.lastId = val.suggestionId;
                    init = false;
                }
                $scope.suggestionsByTeacher.push(val);
                console.log('val ', val);
                console.log('$scope.lastId ', $scope.lastId);
            });

        });

        $scope.doRefresh = function () {
            init = true;
            suggestionService.getSuggestionByTeacher(USER.parentId()).then(function (response) {

                angular.forEach(response, function (val, index) {
                    if (init) {
                        $scope.newlastId = val.suggestionId;
                        init = false;
                    }
                    if (val.suggestionId > $scope.lastId) {
                        $scope.suggestionsByTeacher.push(val);
                    }

                });
                $scope.lastId = $scope.newlastId;
                console.log('$scope.newlastId ', $scope.lastId);
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    })

})();