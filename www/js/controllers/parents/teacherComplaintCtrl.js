angular.module('yugma.controllers', [])

.controller('teacherComplaintsCtrl', function($scope, USER, complaintService, customService, $ionicActionSheet, $ionicModal) {

	$scope.teacherComplaints = [];

	/**
	 * When teacherComplaintsCtrl instantiated
	 * getTeacherComplaint() called immediately
	 */
	var getTeacherComplaint = function () {

		complaintService.getTeacherComplaint(USER.parentId())
		.then(function (response) {
			customService._off();
			console.log(response)
			$scope.teacherComplaints = response;
		});

	}

	customService._on();
	getTeacherComplaint();

})
