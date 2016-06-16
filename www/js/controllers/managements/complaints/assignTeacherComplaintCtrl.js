(function() {

  "use strict";

  angular.module('yugma')

  .controller('assignTeacherComplaintCtrl',

  function ($scope, $state, $stateParams, USER, managementComplaintService, customService) {

    var vm = this;

    var roles = USER.roles();
    customService._on();

    function getDirectorTeacherAssignComplaints() {
      managementComplaintService.getDirectorTeacherAssignComplaints(USER.parentId()).then(function (response) {
        customService._off();
        console.log("getDirectorTeacherAssignComplaints", response);
        vm.allComplaints = response;
      });
    }

    function getAdminTeacherAssignComplaints() {
      managementComplaintService.getAdminTeacherAssignComplaints(USER.parentId()).then(function (response) {
        customService._off();
        console.log("getAdminTeacherAssignComplaints", response);
        vm.allComplaints = response;
      });
    }

    angular.forEach(roles, function (val, index) {

      if (val.roleId === 2 || val.roleId === 3) {

        /***** For director and principle *******/
        getDirectorTeacherAssignComplaints();

      } else {

        /****** For admin, teacher and co-ordinator *******/
        if(_.isEmpty(val.standardIds)) { return; }
        getAdminTeacherAssignComplaints();
      }

      vm.goBack = function () {
        $state.go("management.assignComplaint.assignTeacherComplaint", {}, {reload: true});
      }

    });

  });

})();