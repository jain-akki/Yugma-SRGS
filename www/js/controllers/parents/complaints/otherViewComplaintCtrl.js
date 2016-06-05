angular.module('yugma')

    .controller('otherViewComplaintCtrl', function ($scope, $state, $stateParams, $ionicPopup, USER, customService, complaintService) {

        $scope.cmpl = complaintService.viewOtherComplaint($stateParams.complaintId);
        console.log($scope.cmpl)
        $scope.cmpl.date = moment($scope.cmpl.createdAt).format("DD-MM-YYYY");
        $scope.cmpl.closedDate = moment($scope.cmpl.closedOn).format("DD-MM-YYYY");

        $scope.goBack = function () {
            $state.transitionTo('yugma.complaints.other-complaint');
        }
        
        $scope.closeComplaint = {};

        $scope.closeComplaint = function () {

            var data = {
                template: "<textarea ng-model='closeComplaint.comment' name='message' autofocus></textarea>",
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
                template: 'Glad you are happy, complaint will be closed permanently.'
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
                template: "<textarea ng-model='reOpenComplaint.comment' name='message' autofocus></textarea>" ,
                title: "Reason for reopening the complaint ?",
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