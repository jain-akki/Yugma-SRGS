(function(){

	"use strict";

	angular.module('yugma.controllers', [])

	.controller('teacherComplaintsCtrl', function ($scope, $timeout, USER, complaintService, customService) {

		customService._on();

		$scope.teacherComplaints = [];

		complaintService.getTeacherComplaint(USER.parentId()).then(function (response) {

			$scope.teacherComplaints = response;

			customService._off();

			console.log("Complaint Object: "+ response);

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
			    console.log(response);
				$scope.$broadcast('scroll.refreshComplete');

			});
		};

	})

})();