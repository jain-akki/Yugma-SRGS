angular.module('yugma')

	.controller('otherComplaintsCtrl', function ($scope, USER, complaintService, customService) {

		customService._on();
	
		$scope.otherComplaints = [];

		complaintService.getOtherComplaint(USER.parentId()) .then(function (response) {

			$scope.otherComplaints = response;

			customService._off();

			if ($scope.otherComplaints.length === 0) {
				$("#cmplOtherEmpty").css("display", "inherit");
			}

		});

		/**
		 * When user pull complaint list 
		 * do refresh call immediately
		 */
		$scope.doRefresh = function () {

			$scope.otherComplaints = [];

			complaintService.getOtherComplaint(USER.parentId()) .then(function (response) {

				$scope.otherComplaints = response;
				$scope.$broadcast('scroll.refreshComplete');

			});
		};

	})
