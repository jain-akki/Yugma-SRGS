(function(){

	"use strict";

	angular.module('yugma.controllers', [])

	.controller('teacherComplaintsCtrl', function ($scope, $timeout, USER, complaintService, customService) {

		$scope.teacherComplaints = [];

		complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {

			$scope.teacherComplaints = response;

			if ($scope.teacherComplaints.length === 0) {
				$("#cmplEmpty").css("display", "inherit");
			}

		});

		/**
		 * When user pull complaint list 
		 * do refresh call immediately
		 */
		$scope.doRefresh = function () {

			$scope.teacherComplaints = [];

			complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {
				$scope.teacherComplaints = response;
				
				_.forEach(response, function(val, index) {
					console.log("SASASASASA", val.createdAt)
					var splitDate = (val.createdAt).substring(0, 20).split("-");
					splitDate= [splitDate[1], splitDate[0], splitDate[2]].join("-");
					val.created = new Date(splitDate);
				});

				
				$scope.$broadcast('scroll.refreshComplete');
			});

		};

	})

})();