angular.module('yugma.controllers', [])

	.controller('teacherComplaintsCtrl', function ($scope, $timeout, USER, complaintService, customService) {

		$scope.teacherComplaints = [];

		function getTeacherComplaint() {

			customService._on();

			complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {

				$scope.teacherComplaints = response;

				$timeout(function () {

					_.each($scope.teacherComplaints, function (value, index) {
						if (value.statusName === "New") {
							$('#' + value.id).css('color', 'blue');
						} else if (value.statusName === "Satisfied") {
							$('#' + value.id).css('color', 'green');
						} else {
							$('#' + value.id).css('color', 'yellow');
						}

					});

					customService._off();

				});
			});
		};

		getTeacherComplaint();

		/**
		 * When user pull complaint list 
		 * do refresh call immediately
		 */
		$scope.doRefresh = function () {

			$scope.teacherComplaints = [];

			complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {
				$scope.teacherComplaints = response;
				$scope.$broadcast('scroll.refreshComplete');
			});

		};

	})
