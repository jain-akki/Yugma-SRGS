(function() {

  "use strict";

  angular.module('yugma')

  .controller('managementTeacherViewComplaintCtrl',

  function ($scope, $state, $stateParams, USER, managementComplaintService, customService) {

    var vm = this;

    vm.cmplId = $stateParams.complaintId;

    customService._on();

    managementComplaintService.viewTeacherComplaint($stateParams.complaintId).then(function(response){

      customService._off();

      vm.cmpl = response;

      angular.extend(vm.cmpl, {
        date: moment(vm.cmpl.createdAt).format("DD-MM-YYYY"),
        closedDate: moment(vm.cmpl.closedOn).format("DD-MM-YYYY"),
        name: "teacher"
      });

    });

    vm.goBack = function() {
      $state.go("management.complaints.teacher-complaint", {}, {reload: true})
    }
    
    vm.goToEdit = function() {

      var data = {
        name: vm.cmpl.name,
        cmplId: vm.cmplId,
        priority: vm.cmpl.priorityId,
        assigned: vm.cmpl.authorityId,
        status: vm.cmpl.statusId
      }

      $state.go("management.edit", {obj: data}, {reload: true});
    }

  });

})();