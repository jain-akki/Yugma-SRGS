(function() {
  
  "use strict";
  
  angular.module('yugma')

  .controller('managementTeacherEditComplaintCtrl',

  function ($scope, $state, $stateParams, $ionicHistory, managementComplaintService, customService) {

    customService._on();

    var vm = this;
    vm.status = false;
    vm.statusId = $stateParams.obj.status;

    var id = $stateParams.obj.cmplId,
        name = $stateParams.obj.name;

    managementComplaintService.getAuthors().then(function(response){
      vm.authors = response;
      angular.forEach(response, function(val, index) {
        if (val.id == $stateParams.obj.assigned) {
          vm.selectAuthor = response[index];
        }
      })
    });

    managementComplaintService.getPriorities().then(function(response){
      vm.priorities = response;
      customService._off();
      angular.forEach(response, function(val, index) {
        if (val.id == $stateParams.obj.priority) {
          vm.selectPriority =  response[index];
        }
      });
    });

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

    $scope.$watch("vm.selectAuthor", function(newval, oldval) {
      if (newval && oldval) {
        if (newval.id != oldval.id) {
          vm.newAssign = newval.id;
        }
      }
    }, true);

    $scope.$watch("vm.selectPriority", function(newval, oldval) {
      if (newval && oldval) {
        if (newval.id != oldval.id) {
          vm.newPriority = newval.id;
        }
      }
    }, true);

    function stateChangeToOther() {
      $state.go("management.complaints.other-complaint", {}, {reload: true});
    }
    
    function stateChangeToTeacher() {
      $state.go("management.complaints.teacher-complaint", {}, {reload: true});
    }
    
    function editOtherComplaint() {

      if (vm.newAssign) {
        managementComplaintService.assignOtherComplaint(id, vm.newAssign).then(function(response){
          stateChangeToOther();
        });
      }

      if (vm.newPriority) {
        managementComplaintService.setOtherPriority(id, vm.newPriority).then(function(response){
          stateChangeToOther();  
        });
      }

      if (vm.status) {
        managementComplaintService.setOtherStatus(id, 3).then(function(response){
          stateChangeToOther();
        });
      }

    }

    function editTeacherComplaint() {

      if (vm.newAssign) {
        managementComplaintService.assignComplaint(id, vm.newAssign).then(function(response){
          stateChangeToTeacher();
        });
      }

      if (vm.newPriority) {
        managementComplaintService.setPriority(id, vm.newPriority).then(function(response){
          stateChangeToTeacher();
        });
      }

      if (vm.status) {
        managementComplaintService.setStatus(id, 3).then(function(response){
          stateChangeToTeacher();
        });
      }

    }

    vm.editComplaint = function() {

      customService._on();

      if (name === "other") { editOtherComplaint(); }
      editTeacherComplaint();

      $ionicHistory.clearCache();

    }

  });

})();