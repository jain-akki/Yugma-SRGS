angular.module('yugma.controllers', [])

	.controller('teacherComplaintsCtrl', function ($scope, $timeout, USER, complaintService, customService) {

		$scope.teacherComplaints = [];

		function getTeacherComplaint() {

			customService._on();
			
			complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {

				customService._off();
				$scope.teacherComplaints = response;

				_.forEach(response, function(val, index) {
					var splitDate = (val.createdAt).substring(0, 20).split("-");
					splitDate= [splitDate[1], splitDate[0], splitDate[2]].join("-");
					val.createdAt = new Date(splitDate);
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
