(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementTeacherCloseComplaintCtrl',
  
  function($http, $scope, $state, $stateParams, USER, managementComplaintService, customService, $ionicHistory) {

    var vm = this;

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

    function closeTeacherComplaint (data) {
      managementComplaintService.closeTeacherComplaint(data).then(function (response) {
        $state.go("management.complaints.teacher-complaint", {}, {reload: true});
      });
    }

    function closeOtherComplaint (data) {
      managementComplaintService.closeOtherComplaint(data).then(function (response) {
        $state.go("management.complaints.other-complaint", {}, {reload: true});
      });
    }

    vm.closeComplaint = function(data) {

      angular.extend(data, {
        csaId: $stateParams.complaintId ,
        teacherId: USER.parentId()
      });

      if ($stateParams.name === "other") {
        closeOtherComplaint(data);
      } else {
        closeTeacherComplaint(data);        
      }

    }

  });

})();