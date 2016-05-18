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

	$scope.showActionsheet = function () {
		$ionicActionSheet.show({
			titleText: 'Choose options',
			buttons: [
				{ text: '<i class="icon ion-share"></i> Share' },
				{ text: '<i class="icon ion-arrow-move"></i> Move' },
			],
			destructiveText: 'Delete',
			cancelText: 'Cancel',
			cancel: function() {
				console.log('CANCELLED');
			},
			buttonClicked: function(index) {
				console.log('BUTTON CLICKED', index);
				return true;
			},
			destructiveButtonClicked: function() {
				console.log('DESTRUCT');
				return true;
			}
		});
	};

	/**
	 * When user pull complaint list 
	 * do refresh call immediately
	 */
	$scope.doRefresh = function() {

		$scope.teacherComplaints = [];

		complaintService.getTeacherComplaint(USER.parentId())
		.then(function (response) {
			$scope.teacherComplaints = response;
			$scope.$broadcast('scroll.refreshComplete');
		});

	};

	/**
	 * Create ionic modal
	 */
	$scope.openModal = function(cmpl) {
		$scope.cmpl = cmpl;
		$scope.cmplModal.show();
	};
		
	$ionicModal.fromTemplateUrl('templates/parents/complaintModal.html', function(modal) {
		$scope.cmplModal = modal;
	}, {
		scope: $scope,
		animation: 'jelly'
	});

  $scope.closeModal = function() {
    $scope.cmplModal.hide();
  };

})
