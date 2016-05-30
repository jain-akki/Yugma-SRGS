angular.module('yugma')

    .controller('otherViewComplaintCtrl', function ($scope, $state, $stateParams, $ionicPopup, USER, customService, complaintService) {

        $scope.cmpl = complaintService.viewOtherComplaint($stateParams.complaintId);

        $scope.cmpl.date = moment($scope.cmpl.createdAt).format("DD-MM-YYYY HH:mm:ss");

        $scope.goBack = function () {
            $state.transitionTo('yugma.complaints.other-complaint');
        }
        
        $scope.closeComplaint = {};

        $scope.closeComplaint = function () {

            var data = {
                template: "<textarea ng-model='closeComplaint.comment' name='message'></textarea>",
                title: "Why you want to close this complaint ?",
                scope: $scope,
                modelName: "closeComplaint"
            }

            customService._showPopup(data).then(function (res) {
                if (res) {
                    var closeComplaintData = {
                        csaId: Number($stateParams.complaintId),
                        id: USER.parentId(),
                        comment: "ClosedReason: " + res.comment
                    }
                    complaintService.closeOtherComplaint(closeComplaintData).then(function (response) {
                        $scope.closeComplaint.comment = "";
                        $state.go("yugma.complaints.other-complaint", {}, {
                            reload: true
                        });
                    });
                }
            });
        }
        
        $scope.satisfyComplaint = function () {

            var data = {
                title: 'Close complaint permanently',
                template: 'If you are happay with the resolution please close complaint permanently.'
            }

            customService._showConfirm(data).then(function (res) {
                if (res) {
                    complaintService.satisfyOtherComplaint($stateParams.complaintId).then(function (response) {
                        $state.go("yugma.complaints.other-complaint", {}, {
                            reload: true
                        });
                    })
                }
            });
        }

        $scope.reOpenComplaint = {};

        $scope.reOpenComplaint = function () {

            var data = {
                template: "<textarea ng-model='reOpenComplaint.comment' name='message'></textarea>" ,
                title: "Why you want to reopen this complaint ?",
                scope: $scope,
                modelName: "reOpenComplaint"
            }

            customService._showPopup(data).then(function (res) {
                if (res) {
                    var reOpenComplaintData = {
                        csaId: Number($stateParams.complaintId),
                        id: USER.parentId(),
                        comment: "ReopenReson: " + res.comment
                    }
                    complaintService.reOpenOtherComplaint(reOpenComplaintData).then(function (response) {
                        $scope.reOpenComplaint.comment = "";
                        $state.go("yugma.complaints.other-complaint", {}, {
                            reload: true
                        });
                    });
                }
            });
        }
    })