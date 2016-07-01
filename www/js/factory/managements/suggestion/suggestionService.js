(function () {
  
    "use strict";
  
    angular.module("yugma")

    .factory('managementSuggestionService', function ($http, $q, baseUrl, customService) {

        var TeacherSuggestions = [];

        var getDirectorTeacherSuggestions = function () {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/director/teacher-suggestion"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getAdminTeacherSuggestions = function (standardId, employeeId) {

            var deferred = $q.defer();
            console.log('standardId: ', standardId);
            console.log('employeeId: ', employeeId);
            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/management/fetch-teacher-suggestion/" + standardId + "/" + employeeId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var viewTeacherSuggestion = function (suggestionId) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/management/teacher-suggestion/" + suggestionId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

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

        var getStandards = function () {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-standard"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getChildrens = function (standardId) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-child-by-standard/" + standardId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var saveSuggestionByTeacher = function (data) {

            var deferred = $q.defer();
            console.log('data', data);
            $http({
                method: "POST",
                contentType: "application/json",
                data: data,
                url: baseUrl + "/add-student-suggestion"
            }).success(function (response) {
                console.log('success', response);
                deferred.resolve(response);
            }).error(function (response) {
                console.log('err');
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getSuggestionByTeacher = function (teacherId) {

            var deferred = $q.defer();
            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/student-suggestion-by-teacher/" + teacherId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                console.log('err');
                deferred.reject(response);
            });

            return deferred.promise;
        }

        return {
            getDirectorTeacherSuggestions: getDirectorTeacherSuggestions,
            getAdminTeacherSuggestions: getAdminTeacherSuggestions,
            viewTeacherSuggestion: viewTeacherSuggestion,
            getTeacherSuggestions: getTeacherSuggestions,
            getStandards: getStandards,
            getChildrens: getChildrens,
            saveSuggestionByTeacher: saveSuggestionByTeacher,
            getSuggestionByTeacher: getSuggestionByTeacher
        }

    })

})();