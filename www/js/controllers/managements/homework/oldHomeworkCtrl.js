(function () {

  'use strict';

  angular.module('yugma')

  .controller('oldHomeworkCtrl',

  function($filter, USER, managementHomeworkService, customService) {

    var vm = this;

    customService._on();

    managementHomeworkService.getOldHomework(USER.parentId()).then(function(response){
      customService._off();
      vm.oldHomework = response;
      // _.forEach(response, function(val, index) {
      //   val.due = $filter('date')(val.dueDate, 'MM/dd/yyyy');
      // });
    });
  });

})();