(function () {

    'use strict';

    angular.module('yugma')

      .controller('pollCtrl', function ($scope, USER, parentPollService) {

          console.log('pollCtrl');

          var vm = this;

          vm.pollData = [];
          var childStandardIds = [];
          var user = USER.parentId();
          var childs = USER.parentChilds();
          
          for (i = 0; i < childs.length; i++) {
              childStandardIds.push(childs[i].standardId);
          }

          parentPollService.fetchPollsForParent(childStandardIds, user).then(function (response) {
              angular.forEach(response, function (val) {
                  if(val.done === false){
                    vm.pollData.push(val);
                  }
              });
          });

          vm.selectAnswer = function (answer, poll) {

              var data = {
                  pollId: poll.pollId,
                  parentId: user,
                  resultId: answer
              };
              
              parentPollService.saveParentData(data).then(function (response) {
                  angular.forEach(vm.pollData, function (val, index) {
                      if (poll.pollId == val.pollId) {
                          vm.pollData.splice(index, 1);
                      }
                  })
              });

          }

          $scope.doRefresh = function () {
              parentPollService.fetchPollsForParent(childStandardIds, user).then(function (response) {
                  angular.forEach(response, function (val) {
                      if (val.done === false && val.pollId > vm.pollData[0].pollId) {
                          vm.pollData.push(val);
                      }
                  });
                  $scope.$broadcast('scroll.refreshComplete');
              });
          }

      });
})();