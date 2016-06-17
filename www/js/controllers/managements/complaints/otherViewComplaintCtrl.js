(function() {

  "use strict";

  angular.module('yugma')

  .controller('managementOtherViewComplaintCtrl',

  function ($scope, $state, $stateParams, USER, managementComplaintService, customService, $ionicViewSwitcher) {

    var vm = this;

    customService._on();

    vm.cmplId = $stateParams.complaintId;
    vm.name = $stateParams.name;

    managementComplaintService.viewOtherComplaint($stateParams.complaintId).then(function(response) {

      customService._off();

      vm.cmpl = response;

      angular.extend(vm.cmpl, {
        date: moment(vm.cmpl.createdAt).format("DD-MM-YYYY"),
        closedDate: moment(vm.cmpl.closedOn).format("DD-MM-YYYY"),
        name: $stateParams.name
      });

    });

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
    
    vm.addComment = function() {

      var complaint = {
        id: vm.cmpl.id,
        name: vm.name,
        title: vm.cmpl.title,
        status: vm.cmpl.statusId
      }

      $state.go("management.add-comment", {obj: complaint}, {reload: true});

    }

    vm.goBack = function () {

      if ($stateParams.name === "assignOther") {
        $ionicViewSwitcher.nextDirection("back");
        $state.go("management.assignComplaint.assignOtherComplaint", {}, {reload: false});  
      } else {
        $ionicViewSwitcher.nextDirection("back");
        $state.go("management.complaints.other-complaint", {}, {reload: false});
      }

    }

  });

})();