(function () {

    "use strict";

    angular.module('yugma')

    .controller('managementOtherViewSuggestionCtrl',

    function ($scope, $state, $stateParams, USER, managementSuggestionService, customService, $ionicViewSwitcher) {

        console.log('managementOtherViewSuggestionCtrl');

        var vm = this;

        customService._on();

        vm.cmplId = $stateParams.suggestionId;
        vm.name = $stateParams.name;

        managementSuggestionService.viewOtherSuggestion($stateParams.suggestionId).then(function (response) {

            customService._off();

            vm.cmpl = response;

            angular.extend(vm.cmpl, {
                date: moment(vm.cmpl.createdAt).format("DD-MM-YYYY"),
                closedDate: moment(vm.cmpl.closedOn).format("DD-MM-YYYY"),
                name: $stateParams.name
            });

        });

        vm.goToEdit = function () {

            var data = {
                name: vm.cmpl.name,
                cmplId: vm.cmplId,
                priority: vm.cmpl.priorityId,
                assigned: vm.cmpl.authorityId,
                status: vm.cmpl.statusId
            }

            $ionicViewSwitcher.nextDirection('swap');
            $state.go("management.editSuggestion", { obj: data }, { reload: true });
        }

        vm.addComment = function () {

            var suggestion = {
                id: vm.cmpl.id,
                name: vm.name,
                title: vm.cmpl.title,
                status: vm.cmpl.statusId
            }

            $state.go("management.addCommentsToSuggestion", { obj: suggestion }, { reload: true });

        }

        vm.goBack = function () {

            if ($stateParams.name === "assignOther") {
                $ionicViewSwitcher.nextDirection("back");
                $state.go("management.assignComplaint.assignOtherComplaint", {}, { reload: false });
            } else {
                $ionicViewSwitcher.nextDirection("back");
                $state.go("management.suggestion.otherSuggestion", {}, { reload: false });
            }

        }

    });

})();