angular.module('yugma')

   .controller('teacherViewComplaintCtrl', function ($scope, $stateParams, complaintService) {

      $scope.cmpl = complaintService.viewTeacherComplaint($stateParams.complaintId);

   })