(function () {

    'use strict';

    angular.module('yugma')

    .controller('pollCtrl', function ($scope, USER, parentPollService, customService) {

        var vm = this;

        var childStandardIds = [],
            user = USER.parentId(),
            childs = USER.parentChilds();

        angular.forEach(childs, function(val, index){
            childStandardIds.push(val.standardId);
        });

        customService._on();

        function fetchPolls() {
            vm.pollData = [];
            parentPollService.fetchPollsForParent(childStandardIds, user).then(function (response) {
                customService._off();
                angular.forEach(response, function (val) {
                    if (val.done === false) {
                        vm.pollData.push(val);
                    }
                });
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        fetchPolls();

        vm.selectAnswer = function (answer, poll) {

            var data = {
                pollId: poll.pollId,
                parentId: user,
                resultId: answer
            };
              
            parentPollService.savePollResult(data).then(function (response) {
                angular.forEach(vm.pollData, function (val, index) {
                    if (poll.pollId == val.pollId) {
                        vm.pollData.splice(index, 1);
                    }
                })
            });

        }

        $scope.doRefresh = function () {
            fetchPolls();
        }

    });
})();