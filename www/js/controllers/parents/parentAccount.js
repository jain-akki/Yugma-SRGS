angular.module('yugma')

   .controller('AccountCtrl', function ($scope, USER) {

      var vm = this;

      vm.parentName = USER.parentName();
      
      vm.childs = USER.parentChilds();

      vm.contactNo = "9034512998";
      
      vm.emailId = "balar.tushar1@gmail.com";

   })