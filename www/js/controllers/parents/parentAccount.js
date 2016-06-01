angular.module('yugma')

  .controller('AccountCtrl', function ($scope, $state, USER, customService, authService) {

    var vm = this;

    vm.parentName = USER.parentName();

    vm.childs = USER.parentChilds();

    vm.contactNo = "9034512998";

    vm.emailId = "balar.tushar1@gmail.com";

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

  })