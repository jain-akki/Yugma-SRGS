angular.module("yugma")

   .factory('suggestionService', function ($http, $q, baseUrl, customService) {

       var TeacherSuggestions = [];

       var getTeacherSuggestions = function (id) {

           var deferred = $q.defer();

           $http({
               method: "GET",
               contentType: "application/json",
               url: baseUrl + "/teacher-suggestion/" + id
           }).success(function (response) {
               TeacherSuggestions = response;
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;
       }

       var getTeacher = function (standardId) {

           var deferred = $q.defer();

           $http({
               method: "GET",
               contentType: "application/json",
               url: baseUrl + "/parent/teacher/" + standardId
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (params) {
               deferred.reject(response);
           })

           return deferred.promise;
       }

       var getAllCategory = function () {

           var deferred = $q.defer();

           $http({
               method: 'GET',
               contentType: 'application/json',
               url: baseUrl + "/fetch-category"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;
       }

       var saveTeacherSuggestion = function (data) {

           var deferred = $q.defer();

           $http({
               method: 'POST',
               contentType: 'application/json',
               data: data,
               url: baseUrl + "/save-suggestion"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;
       }

       return {
           getTeacherSuggestions: getTeacherSuggestions,
           getTeacher: getTeacher,
           getAllCategory: getAllCategory,
           saveTeacherSuggestion: saveTeacherSuggestion,
       }
   })