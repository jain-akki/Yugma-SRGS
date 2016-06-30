(function () {

    'use strict';

    angular.module('yugma')

    .controller('suggestionForTeacherSelfCtrl',
  
        function ($scope, authService, USER, customService, managementSuggestionService) {
  
            var vm = this;

            console.log("suggestionForTeacherSelfCtrl");

            var id = USER.parentId();

            var empName = USER.employeeName();

            customService._on();

            function getTeacherSuggestions() {
                managementSuggestionService.getTeacherSuggestions(id).then(function (response) {
                    customService._off();
                    vm.allSuggestions = response;
                    console.log(response);
                });
            };

            getTeacherSuggestions();

            console.log('ID: ' + id);
            console.log('Emp. Name: ' + empName);

        });

})();