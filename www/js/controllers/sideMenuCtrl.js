(function () {

    'use strict';

    angular.module('yugma')
        .controller('sideMenuCtrl', function($scope) {
            console.log('sideMenuCtrl');
            $scope.menuItem = false;
            $scope.toggle = function () {
                if ($scope.menuItem) {
                    $scope.menuItem = false;
                } else {
                    $scope.menuItem = true;
                }
                console.log($scope.menuItem);
                return $scope.menuItem;
            }

            $scope.isShown = function () {
                return $scope.menuItem;
            };
        
        })
})();