angular.module('yugma.controllers', [])

	.controller('teacherComplaintsCtrl', function ($scope, $timeout, USER, complaintService, customService) {

		$scope.teacherComplaints = [];

		function getTeacherComplaint() {

			customService._on();

			complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {

				customService._off();

				$scope.teacherComplaints = response;

				$timeout(function () {
					dayDiff($scope.teacherComplaints);
				});
			});
		};

		getTeacherComplaint();

		/**
		 * purpose of this function
		 * calculate day difference between
		 * complaint date and current date
		 */
		function dayDiff(complaints) {

			var createDate;

			_.forEach(complaints, function (val, index) {

				createDate = val.createdAt.substring(0, 19);

				var d = new Date();
				var currentDate = moment(d).format("DD-MM-YYYY");

				var a = currentDate.split("-");
				var b = createDate.split("-");

				//day difference between current date and complaint date
				if (a[0] - b[0] >= 1) {
					val.createdAt = createDate.substring(0, 5);
				} else {
					val.createdAt = createDate.substring(11, 16);
				}

			});
		}

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
