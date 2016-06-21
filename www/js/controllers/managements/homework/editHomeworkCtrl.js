(function () {

  'use strict';

  angular.module('yugma')

  .controller('editHomeworkCtrl',

  function($scope, $state, $filter, $stateParams, USER, managementHomeworkService, customService, $ionicHistory) {

    var vm = this;

    vm.hw = managementHomeworkService.viewHomework($stateParams.homeworkId);
    vm.hw.createDate = $filter('date')(vm.hw.createdAt, 'dd/MM/yyyy');
    vm.hw.dueDate = new Date(vm.hw.dueDate);

  });

})();