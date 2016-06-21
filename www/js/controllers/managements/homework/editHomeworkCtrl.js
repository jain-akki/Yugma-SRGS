(function () {

  'use strict';

  angular.module('yugma')

  .controller('editHomeworkCtrl',

  function($scope, $state, $filter, $stateParams, USER, managementHomeworkService, customService, $ionicHistory, $ionicViewSwitcher) {

    var vm = this;

    vm.hw = managementHomeworkService.viewHomework($stateParams.homeworkId);
    vm.hw.createDate = $filter('date')(vm.hw.createdAt, 'dd/MM/yyyy');
    vm.hw.dueDate = new Date(vm.hw.dueDate);

    $scope.$watch("vm.hw.homeworkTitle", function (newVal, oldVal) {

    });

    var newDecs,
        newDueDate;

    $scope.$watch("vm.hw.description", function (newVal, oldVal) {

      if (newVal != oldVal) {
        newDecs = newVal;
      }
    });

    $scope.$watch("vm.hw.dueDate", function (newVal, oldVal) {

      if (newVal != oldVal) {
        newDueDate = $filter('date')(newVal, 'yyyy-MM-dd');
      }
    });

    function updateDesc(data) {
      managementHomeworkService.updateDesc(data).then(function(response) {
        customService._off();
        $ionicViewSwitcher.nextDirection("exit");
        $state.go("management.homework.dueHomework", {}, {reload: true});
      });
    }

    function updateDueDate(data) {
      managementHomeworkService.updateDueDate(data).then(function(response) {
        customService._off();
        $ionicViewSwitcher.nextDirection("exit");
        $state.go("management.homework.dueHomework");
      });
    }

    vm.updateHomework = function () {

      customService._on();

      if (newDecs) {
        var data = {
          id: $stateParams.homeworkId,
          name: newDecs
        }
        updateDesc(data);
      } else if(newDueDate) {
        var data = {
          id: $stateParams.homeworkId,
          name: newDueDate
        }
        $ionicHistory.clearCache();
        updateDueDate(data);
      } else {
        alert("AA")
        customService._off();
      }

    }

  });

})();