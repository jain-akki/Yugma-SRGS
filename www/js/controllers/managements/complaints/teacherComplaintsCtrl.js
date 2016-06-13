(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementTeacherComplaintsCtrl',
  
  function($http, $scope, USER, managementComplaintService, customService) {
  
    var vm = this;

    var roles = USER.roles();
    customService._on();

    function getDirectorTeacherComplaints() {
      managementComplaintService.getDirectorTeacherComplaints().then(function (response) {
        customService._off();
        vm.allComplaints = response;
      });
    };

    function getAdminTeacherComplaints(id) {
      managementComplaintService.getAdminTeacherComplaints(id, USER.parentId()).then(function (response) {
        customService._off();
        vm.allComplaints = response;
        console.log(response)
      });
    };

    angular.forEach(roles, function (val, index) {
    
      if (val.roleId === 2 || val.roleId === 3) {

        /***** For director and principle *******/
        getDirectorTeacherComplaints();
        
      } else {

        /****** For admin, teacher and co-ordinator *******/
        if(_.isEmpty(val.standardIds)) { return; }
        getAdminTeacherComplaints(val.standardIds);
      }

    });
  });

})();