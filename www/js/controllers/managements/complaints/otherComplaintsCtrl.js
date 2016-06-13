(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementOtherComplaintsCtrl', function($http, $scope, USER, managementComplaintService, customService) {

    var vm = this,
        roles = USER.roles(),
        categoryIds = [0],
        standardIds = [0];

    customService._on();

    function getDirectorOtherComplaints() {
      managementComplaintService.getDirectorOtherComplaints().then(function (response) {
        customService._off();
        vm.allComplaints = response;
      });
    }

    function getAdminOtheComplaints() {
      managementComplaintService.getAdminOtheComplaints(categoryIds, standardIds).then(function (response) {
        customService._off();
        vm.allComplaints = response;
      });
    }

    getDirectorOtherComplaints();

    angular.forEach(roles, function (val, index) {

      if (roles.length != index) {

        if (val.roleId === 2 || val.roleId === 3) {

          /***************** For director and principle *********************/
          getDirectorOtherComplaints();

        } else {

          /*************** For admin, teacher and co-ordinator *****************/
          if (val.standardIds != null) {
            standardIds = val.standardIds;
          }

          if (val.categoryIds != null) {
            categoryIds = val.categoryIds;
          }

          if (roles.length == index + 1) {
            getAdminOtheComplaints();
          }
        }
      }
    });

  });

})();