angular.module('yugma')

  .controller('AccountCtrl', function ($scope, $state, USER, customService, authService) {

    var vm = this;

    vm.parentName = USER.parentName();

    vm.childs = USER.parentChilds();

    vm.contactNo = USER.parentContact();

    vm.emailId = USER.parentEmail();

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