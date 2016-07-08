(function () {

    'use strict';

    angular.module('yugma')

    .controller('viewPollCtrl', function (USER, managementpollService) {

        var vm = this;

        managementpollService.fetchPollResult(USER.parentId()).then(function (response) {
            vm.results = response;
        });
    });
}());
