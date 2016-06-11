(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementTeacherComplaintsCtrl', function($http, $scope, USER, managementComplaintService,       customService) {
    
    var vm = this;
       
    var roles = USER.roles();
    customService._on();
    
    angular.forEach(roles, function (val, index) {
    
      if (val.roleId === 2 || val.roleId === 3) {
        
        /**
         * For director and principle
         */

        managementComplaintService.getDirectorTeacherComplaints().then(function (response) {
          customService._off();
          vm.allComplaints = response;
        });
        
      } else {

        /**
         * For admin, teacher and co-ordinator
         */
        if(_.isEmpty(val.standardIds)) { return; }

        managementComplaintService.getAdminTeacherComplaints(val.standardIds, USER.parentId()).then(function (response) {
          customService._off();
          vm.allComplaints = response;
          console.log(response)
        });

      }
    });
    
  })

})();