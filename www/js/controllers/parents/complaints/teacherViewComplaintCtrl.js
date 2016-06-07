angular.module('yugma')

    .controller('teacherViewComplaintCtrl', function ($scope, $state, $stateParams, $ionicPopup, USER, customService, complaintService) {

        $scope.cmpl = complaintService.viewTeacherComplaint($stateParams.complaintId);
        $scope.cmpl.date = moment($scope.cmpl.createdAt).format("DD-MM-YYYY");
        $scope.cmpl.closedDate = moment($scope.cmpl.closedOn).format("DD-MM-YYYY");

        $scope.goBack = function () {
            $state.transitionTo('yugma.complaints.teacher-complaint');
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
                    complaintService.closeComplaint(closeComplaintData).then(function (response) {
                        $scope.closeComplaint.comment = "";
                        $state.go("yugma.complaints.teacher-complaint", {}, {
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
                    complaintService.satisfyTeacherComplaint($stateParams.complaintId).then(function (response) {
                        $state.go("yugma.complaints.teacher-complaint", {}, {
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
                    complaintService.reOpenComplaint(reOpenComplaintData).then(function (response) {
                        $scope.reOpenComplaint.comment = "";
                        $state.go("yugma.complaints.teacher-complaint", {}, {
                            reload: true
                        });
                    });
                }
            });
        }
    })