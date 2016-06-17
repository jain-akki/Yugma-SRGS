(function () {

  'use strict';

  angular.module('yugma')

  .controller('newHomeworkCtrl',
  
  function($scope, $state, $filter, USER, managementHomeworkService, customService, $ionicHistory) {

    var vm = this;

    $scope.homework = {};

    managementHomeworkService.getStandards().then(function(response){
      $scope.standards = response;
    });

    vm.addHomework = function (data) {

      $scope.homeworks = {};

      angular.copy(data, $scope.homeworks);

      angular.extend($scope.homeworks, {
        dueDate : vm.dueDate,
        teacherId: USER.parentId(),
        standardId: $scope.homework.standardId
      });

      managementHomeworkService.addHomework($scope.homeworks).then(function(response) {
        $scope.homework = {};
      });
    }

    $scope.$watch("homework.dueDate", function (newVal, oldVal) {
      vm.dueDate = $filter('date')(newVal, 'yyyy-MM-dd');
    }, true);

  });

})();