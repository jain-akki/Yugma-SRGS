angular.module('yugma')

	.controller('otherComplaintsCtrl', function ($scope, USER, complaintService, customService) {

		$scope.otherComplaints = [];

		customService._on();

		complaintService.getOtherComplaint(USER.parentId()) .then(function (response) {
			customService._off();
			$scope.otherComplaints = response;
			_.forEach(response, function(val, index) {
					var splitDate = (val.createdAt).substring(0, 20).split("-");
					splitDate= [splitDate[1], splitDate[0], splitDate[2]].join("-");
					val.createdAt = new Date(splitDate);
				});
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
