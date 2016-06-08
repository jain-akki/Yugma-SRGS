(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementOtherComplaintsCtrl', function($http, $scope, USER, managementComplaintService, customService) {
    
    var vm = this;
    
    var roles = USER.roles();
    customService._on();

    angular.forEach(roles, function (val, index) {
    
      if (val.roleId === 2 || val.roleId === 3) {
        
        /**
         * For director and principle
         */
        
        managementComplaintService.getDirectorOtherComplaints().then(function (response) {
          customService._off();
          vm.allComplaints = response;
        });
        
      } else {

        /**
         * For admin, teacher and co-ordinator
         */

        var categoryIds = val.categoryIds;
        var standardIds = val.standardIds;

        if (_.isEmpty(categoryIds)) {
          categoryIds = [0];
        }

        if (_.isEmpty(standardIds)) {
          standardIds = [0];
        }

        managementComplaintService.getAdminOtheComplaints(categoryIds, standardIds).then(function (response) {
          customService._off();
          vm.allComplaints = response;
        });
        
      }

    });

    vm.doRefresh = function() {

      managementComplaintService.getDirectorOtherComplaints().then(function (response) {
        vm.allComplaints = response;
        $scope.$broadcast('scroll.refreshComplete');
      });

    }
    
  })

})();