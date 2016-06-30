(function () {
  
    "use strict";
  
    angular.module("yugma")

    .factory('managementSuggestionService', function ($http, $q, baseUrl, customService) {

        var TeacherSuggestions = [];

        var getTeacherSuggestions = function (id) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/teacher/fetch-suggestion-by-teacher-id/" + id
            }).success(function (response) {
                TeacherSuggestions = response;
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        return {
            getTeacherSuggestions: getTeacherSuggestions
        }

    })

})();