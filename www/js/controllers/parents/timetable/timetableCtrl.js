angular.module('yugma')

  .controller('timetableCtrl', function ($scope, $state, USER, customService, timetableService) {

    var vm = this;

    vm.childs = USER.parentChilds();

    if (vm.childs.length === 1) {
      customService._on();
      vm.singleStudentName = vm.childs[0].studentName;
      getTimetable(vm.childs[0].standardId);
    }

    function getTimetable(standardId) {

      $scope.timetable = [];

      timetableService.getTimetable(standardId).then(function (response) {
        _.find(response, function (response, n) {
          $scope.timetable.push({
            day: response[day],
            time: response.periodTime
          });
        });
        customService._off();
      });

    }

    var day;

    Date.prototype.getTodayDay = function () {

      var d = new Date();
      var weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

      day = weekday[d.getDay() - 1];
      $("#" + day).addClass("activeBtn");

    }

    new Date().getTodayDay();

    vm.selectChild = function (child) {
      getTimetable(child.standardId);
      $(".button-positive").addClass("animated bounceOutRight");
      $(".button-positive").css("display", "none");
      $(".add-complaint-child-name").html(child.studentName);
      customService._on();
    }

    vm.clearHistory = function () {
      $state.go($state.current, {}, { reload: true });
    }

  })