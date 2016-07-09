(function () {

  'use strict';

  angular.module('yugma')

  .controller('dueHomeworkCtrl',

  function($filter, USER, managementHomeworkService, customService) {

    var vm = this;

    customService._on();

    managementHomeworkService.dueHomework(USER.parentId()).then(function(response){
      customService._off();
      vm.dueHomework = response;
      _.forEach(response, function(val, index) {
        val.due = $filter('date')(val.dueDate, 'MM/dd/yyyy');
      });

    });
  });

})();