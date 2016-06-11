(function() {

  "use strict";

  angular.module('yugma')

  .controller('managementOtherViewComplaintCtrl',

  function ($scope, $state, $stateParams, USER, managementComplaintService, customService) {

    var vm = this;

    customService._on();

    vm.cmplId = $stateParams.complaintId;

    managementComplaintService.viewOtherComplaint($stateParams.complaintId).then(function(response) {

      customService._off();

      vm.cmpl = response;

      angular.extend(vm.cmpl, {
        date: moment(vm.cmpl.createdAt).format("DD-MM-YYYY"),
        closedDate: moment(vm.cmpl.closedOn).format("DD-MM-YYYY"),
        name: "other"
      });

    });

    vm.goBack = function() {
      $state.go("management.complaints.other-complaint", {}, {reload: true})
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