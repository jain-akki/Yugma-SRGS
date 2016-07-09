(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementTeacherCloseComplaintCtrl',
  
  function($scope, $state, $stateParams, USER, managementComplaintService, customService, $ionicHistory) {

    var vm = this;

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

    function closeTeacherComplaint (data) {
      customService._off();
      managementComplaintService.closeTeacherComplaint(data).then(function (response) {
        if ($stateParams.name === "assignTeacher") {
          $state.go("management.assignComplaint.assignTeacherComplaint", {}, {reload: true});  
        } else {
          $state.go("management.complaints.teacher-complaint", {}, {reload: true});
        }
      });
    }

    function closeOtherComplaint (data) {
      customService._off();
      managementComplaintService.closeOtherComplaint(data).then(function (response) {
        if ($stateParams.name === "assignOther") {
          $state.go("management.assignComplaint.assignOtherComplaint", {}, {reload: true});  
        } else {
          $state.go("management.complaints.other-complaint", {}, {reload: true});
        }
      });
    }

    vm.closeComplaint = function(data) {

      customService._on();
      
      $ionicHistory.clearCache();

      angular.extend(data, {
        comment: "ClosedReason: " + data.comment,
        csaId: $stateParams.complaintId ,
        teacherId: USER.parentId()
      });

      if ($stateParams.name === "other" || $stateParams.name === "assignOther") {
        closeOtherComplaint(data);
      } else {
        closeTeacherComplaint(data);        
      }

      $scope.complaint = {};
    }

  });
})();