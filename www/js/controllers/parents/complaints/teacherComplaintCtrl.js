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

			var b,
				 createDate,
				 d = new Date(),
				 currentDate = moment(d).format("DD/MM/YYYY"),
				 a = currentDate.split("/");

			_.forEach(complaints, function (val, index) {

				createDate = val.createdAt.substring(0, 19);

				b = createDate.split("-");
				
				/**
				 * Now replace '-' to '/'
				 * and change year to two digits
				 */
				if (a[0] - b[0] >= 1) {
					val.createdAt = moment(createDate.replace(/-/g, '/').substring(0, 10), "DD/MM/YYYY").format("DD/MM/YY");
				} else {
					val.createdAt = createDate.replace(/-/g, '/').substring(11, 16);
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
