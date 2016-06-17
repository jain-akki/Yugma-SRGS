(function () {

  'use strict';

  angular.module('yugma')

  .controller('dueHomeworkCtrl',
  
  function($scope, $state, USER, managementHomeworkService, customService, $ionicHistory) {

    var vm = this;

    managementHomeworkService.getHomework(USER.parentId()).then(function(response){
      vm.dueHomework = response;
    });

  });

})();