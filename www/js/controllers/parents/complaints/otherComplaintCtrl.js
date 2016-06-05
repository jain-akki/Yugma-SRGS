angular.module('yugma')

	.controller('otherComplaintsCtrl', function ($scope, USER, complaintService, customService) {

		$scope.otherComplaints = [];

		complaintService.getOtherComplaint(USER.parentId()) .then(function (response) {

			$scope.otherComplaints = response;

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
				_.forEach(response, function(val, index) {
					var splitDate = (val.createdAt).substring(0, 20).split("-");
					splitDate= [splitDate[1], splitDate[0], splitDate[2]].join("-");
					val.created = new Date(splitDate);
				});

				$scope.$broadcast('scroll.refreshComplete');
			});
		};

	})
