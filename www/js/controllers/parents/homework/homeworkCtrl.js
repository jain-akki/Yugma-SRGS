angular.module('yugma')

  .controller('homeworkCtrl', function ($scope, $state, USER, customService, homeworkService) {

    var vm = this;

    vm.childs = USER.parentChilds();

    if (vm.childs.length === 1) {
      customService._on();
      $(".has-subheader").removeClass("has-subheader");
      getHomework(vm.childs[0].standardId);
    }
    
    function getHomework(standardId) {
			homeworkService.getHomework(standardId).then(function(response) {
        vm.homework = response;
        customService._off();
      });
		}
   
    vm.selectChild = function (child) {
      getHomework(child.standardId);
      $(".button-positive").addClass("animated bounceOutRight");
      $(".button-positive").css("display", "none");
      $(".add-complaint-child-name").html(child.studentName);
      customService._on();
    }
   
    vm.clearHistory = function () {
      $state.go($state.current, {}, {reload:true});
    }

  })