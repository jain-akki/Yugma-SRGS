angular.module('yugma')

.controller('foodmenuCtrl', function ($scope, $state, USER, customService, foodmenuService) {

  var vm = this;

  $scope.tabs = [{
      "text": "Mon"
    }, {
      "text": "Tue"
    }, {
      "text": "Wed"
    }, {
      "text": "Thu"
    }, {
      "text": "Fri"
    }, {
      "text": "Sat"
    }];
 
  var arr = [];
 
  function getFoodmenu() {

    vm.foodmenu = [];

    foodmenuService.getFoodmenu().then(function (response) {

      arr = response;

      _.find(response, function (response, n) {
        vm.foodmenu.push({
          food: response[day]
        });
      });
      customService._off();
    });

  }

  getFoodmenu();

  var day;
  var weekday;

  Date.prototype.getTodayDay = function () {

    var d = new Date();
    weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    day = weekday[d.getDay() - 1];
    $scope.day = weekday.indexOf(day);

  }

  new Date().getTodayDay();

  vm.clearHistory = function () {
    $state.go($state.current, {}, { reload: true });
  }

  $scope.onSlideMove = function (data) {
    vm.foodmenu = [];
    _.find(arr, function (response, n) {
      vm.foodmenu.push({
        day: response[weekday[data.index]],
        time: response.periodTime
      });
    });
  };

})