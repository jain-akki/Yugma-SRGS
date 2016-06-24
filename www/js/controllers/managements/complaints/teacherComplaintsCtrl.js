(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementTeacherComplaintsCtrl',
  
  function($http, $scope, $state, USER, managementComplaintService, customService, $ionicViewSwitcher) {
  
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
      });
    };

    angular.forEach(roles, function (val, index) {
    
      if (val.roleId === 2 || val.roleId === 3) {

        /***** For director and principle *******/
        getDirectorTeacherComplaints();
        
      } else {

        /****** For admin, teacher and co-ordinator *******/
        if(_.isEmpty(val.standardIds)) { 
          customService._off();
          return;
        }

        getAdminTeacherComplaints(val.standardIds);
      }

    });

    vm.viewAssignCmpl = function() {
      $state.go("management.assignComplaint.assignTeacherComplaint", {}, {reload: true});
    }
    
    vm.goToViewTeacher = function(id, name) {
      console.log(id, name);
      // customService._on();
      // $ionicViewSwitcher.nextDirection("forward");
      $state.go("management.view-teacher-complaint", {complaintId: id, name: name}, {reload: true});
    }

  });

})();