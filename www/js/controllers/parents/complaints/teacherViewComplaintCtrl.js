angular.module('yugma')

   .controller('teacherViewComplaintCtrl', function ($scope, $state, $stateParams, complaintService) {

      $scope.cmpl = complaintService.viewTeacherComplaint($stateParams.complaintId);

      $scope.goBack = function () {
         $state.transitionTo('yugma.complaints.teacher-complaint');
      }

   })