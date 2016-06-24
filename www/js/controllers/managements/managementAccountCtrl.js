(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementAccountCtrl',

  function($scope, USER, customService, authService, $state) {

    var vm = this;

    vm.parentName = USER.employeeName ();
    vm.role = USER.roles()[0].roleName;

    vm.logout = function () {

      var data = {
        template: 'Sure you want to logout?'
      }

      customService._showConfirm(data).then(function (res) {
        if (res) {
          authService.logout();
          $state.go("login.parents", {}, {reload: true});
        }
      });

    };

  });

})();