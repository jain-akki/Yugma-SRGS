(function () {

    'use strict';

    angular.module('yugma')
        .controller('sideMenuCtrl', function($scope, $localStorage, USER) {
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

            if ($localStorage.sessionData) {
                $scope.roleName = $localStorage.sessionData.employeeName;
            } else {
                $scope.roleName = USER.parentName();
            }
        
        })
})();