(function () {

    'use strict';

    angular.module('yugma')

    .controller('addPollCtrl',

    function ($scope, $state, managementpollService, USER, $ionicPopup, $filter, customService) {

        var vm = this;

        $scope.selectedStd = [];

        $('#submitBtn').attr('disabled', 'disabled');

        function getStandards() {
            managementpollService.fetchStandards().then(function (response) {
                customService._off();
                vm.standards = response;
            });
        }

        managementpollService.fetchOptionCategory().then(function (response) {
            vm.categories = response;
        });

        managementpollService.fetchPollType().then(function (response) {
            vm.types = response;
        });

        $scope.$watch("vm.selectCategory", function (newVal, oldVal) {
            if (newVal) {
                if (newVal.id != oldVal) {
                    vm.optionCategoryId = newVal.id;
                }
            }
        }, true);

        $scope.$watch("vm.selectType", function (newVal, oldVal) {

            if (newVal) {
                if (newVal.id != oldVal) {
                    vm.pollType = newVal.id;
                }
                if (newVal.id === 2) {
                    customService._on();
                    getStandards();
                    $('#submitBtn').attr('disabled', 'disabled');
                }
            }
        }, true);

        $scope.showPopup = function () {
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                template: '<ion-list><ion-checkbox ng-repeat="std in vm.standards" ng-checked="select.std.indexOf(std) > -1" ng-click="toggleStd(std)" >{{std.name}}</ion-checkbox></ion-list>',
                title: 'Select Standard',
                scope: $scope,
                buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.selectedStd = [];
                        angular.forEach($scope.select.std, function(val, index){
                            $scope.selectedStd.push(val.name);
                        });
                        if($scope.selectedStd.length > 0) {
                            //$('#submitBtn').removeAttr('disabled');
                        }
                    }
                }
                ]
            });
            myPopup.then(function (res) {
            });
        };

        $scope.select = { std: [], stdId: [] };

        $scope.toggleStd = function (std) {
            var idx = $scope.select.std.indexOf(std);
            if (idx > -1) {
                $scope.select.std.splice(idx, 1);
                $scope.select.stdId.splice(idx, 1);
            } else {
                $scope.select.std.push(std);
                $scope.select.stdId.push(std.id);
            }
        }

        vm.addPoll = function () {

            customService._on();

            var data = {
                teacherId: USER.parentId(),
                question: vm.pollTitle,
                dueDate: $filter('date')(vm.pollDueDate, 'yyyy-MM-dd'),
                optionCategoryId: vm.optionCategoryId,
                pollTypeId: vm.pollType,
                standardIds: $scope.select.stdId
            };

            managementpollService.savePollData(data).then(function (response) {
                customService._off();
                data = {};
                $state.go('management.pollTab.viewPoll');
            });
        }
    });
})();