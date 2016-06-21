(function () {

  'use strict';

  angular.module('yugma')

  .controller('dueHomeworkCtrl',

  function($scope, $state, USER, managementHomeworkService, customService) {

    var vm = this;

    customService._on();

    managementHomeworkService.dueHomework(USER.parentId()).then(function(response){
      customService._off();
      vm.dueHomework = response;
    });

  });

})();