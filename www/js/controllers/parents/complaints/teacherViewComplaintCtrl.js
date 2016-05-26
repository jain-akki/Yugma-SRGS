angular.module('yugma')

   .controller('teacherViewComplaintCtrl', function ($scope, $state, $stateParams, $ionicPopup, USER, customService,complaintService) {

      $scope.cmpl = complaintService.viewTeacherComplaint($stateParams.complaintId);
      
      $scope.goBack = function () {
         $state.transitionTo('yugma.complaints.teacher-complaint');
      }

      $scope.closeComplaint = {};

      $scope.closeComplaint = function () {

         var myPopup = $ionicPopup.show({
            template: '<textarea ng-model="closeComplaint.comment" name="message"></textarea>',
            title: 'Why you want to close this complaint ?',
            scope: $scope,
            buttons: [{
               text: 'Cancel',
               onTap: function (e) {
                  // alert($scope.closeComplaint.comment);
                  return 'cancel button'
               }
            }, {
                  text: '<b>Ok</b>',
                  type: 'button-positive',
                  onTap: function (e) {

                     var data = {
                        csaId: Number($stateParams.complaintId),
                        id: USER.parentId(),
                        comment: "ClosedReason: " + $scope.closeComplaint.comment
                     }

                     complaintService.closeComplaint(data).then(function (response) {
                        data = {};
                        $state.go("yugma.complaints.teacher-complaint", {}, {reload: true});
                     });

                     return 'ok button'
                  }
               }]
         });
      }
      
      $scope.satisfyComplaint = function () {
            
            var data  = {
                  title: 'Close complaint permanently',
                  template: 'If you are happay with the resolution please close complaint permanently.'
            }
            
            customService._showConfirm(data).then(function (res) {
                  if (res) {
                        $scope.closeComplaint.comment = "";
                        complaintService.satisfyTeacherComplaint($stateParams.complaintId).then(function(response) {
                              $state.go("yugma.complaints.teacher-complaint", {}, {reload: true});
                        })
                  }
            });
      }
      
      $scope.reOpenComplaint = {};
      
      $scope.reOpenComplaint = function () {
            
            var myPopup = $ionicPopup.show({
                  template: '<textarea ng-model="reOpenComplaint.comment" name="message"></textarea>',
                  title: 'Why you want to reopen this complaint ?',
                  scope: $scope,
                  buttons: [{
                  text: 'Cancel',
                  onTap: function (e) {
                        // alert($scope.closeComplaint.comment);
                        return 'cancel button'
                  }
                  }, {
                        text: '<b>Ok</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                              if (!$scope.reOpenComplaint.comment) {
                                    e.preventDefault();
                              }

                              var data = {
                                    csaId: Number($stateParams.complaintId),
                                    id: USER.parentId(),
                                    comment: "ReopenReson: " + $scope.reOpenComplaint.comment
                              }

                              complaintService.reOpenComplaint(data).then(function (response) {
                                    console.log(response);
                                    $scope.reOpenComplaint.comment = "";
                                    $state.go("yugma.complaints.teacher-complaint", {}, {reload: true});
                                    
                              });

                              return 'ok button'
                        }
                  }]
            });
            
      }

   })