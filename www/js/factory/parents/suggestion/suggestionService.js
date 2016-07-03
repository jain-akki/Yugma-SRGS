angular.module("yugma")

   .factory('suggestionService', function ($http, $q, baseUrl, customService) {

       var getSuggestionByTeacher = function (studentId) {

           var deferred = $q.defer();
           console.log('studentId: ',studentId);
           $http({
               method: "GET",
               contentType: "application/json",
               url: baseUrl + "/student-suggestion-by-student/" + studentId
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
               url: baseUrl + "/teacher-suggestion/" + id
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;
       }

       var getOtherSuggestion = function (id) {

           var deferred = $q.defer();

           $http({
               method: "GET",
               contentType: "application/json",
               url: baseUrl + "/suggestion/" + id
           }).success(function (response) {
               OtherSuggestions = response;
               deferred.resolve(response);
           }).error(function (params) {
               deferred.reject(response);
           })

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

       var closeSuggestion = function (data) {

           var deferred = $q.defer();

           $http({
               method: "PUT",
               contentType: "application/json",
               data: data,
               url: baseUrl + "/teacher-suggestion-close"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var satisfyTeacherSuggestion = function (suggestionId) {

           var deferred = $q.defer();

           $http({
               method: "GET",
               contentType: "application/json",
               url: baseUrl + "/teacher-suggestion-close/" + suggestionId
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var reOpenSuggestion = function (data) {

           var deferred = $q.defer();

           $http({
               method: "PUT",
               contentType: "application/json",
               data: data,
               url: baseUrl + "/teacher-suggestion-reopen"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var closeOtherSuggestion = function (data) {

           var deferred = $q.defer();

           $http({
               method: "PUT",
               contentType: "application/json",
               data: data,
               url: baseUrl + "/suggestion-close"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var reOpenOtherSuggestion = function (data) {

           var deferred = $q.defer();

           $http({
               method: "PUT",
               contentType: "application/json",
               data: data,
               url: baseUrl + "/suggestion-reopen"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var satisfyOtherSuggestion = function (suggestionId) {

           var deferred = $q.defer();

           $http({
               method: "GET",
               contentType: "application/json",
               url: baseUrl + "/suggestion-close/" + suggestionId
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       return {
           getSuggestionByTeacher: getSuggestionByTeacher,
           getTeacherSuggestions: getTeacherSuggestions,
           getOtherSuggestion: getOtherSuggestion,
           getTeacher: getTeacher,
           getAllCategory: getAllCategory,
           saveTeacherSuggestion: saveTeacherSuggestion,
           viewSuggestionByParent: function (suggId) {
               for (var i = 0; i < TeacherSuggestions.length; i++) {
                   if (TeacherSuggestions[i].id === parseInt(suggId)) {
                       return TeacherSuggestions[i];
                   }
               }
               return null;
           },
           viewOtherSuggestion: function (cmplId) {
               for (var i = 0; i < OtherSuggestions.length; i++) {
                   if (OtherSuggestions[i].id === parseInt(cmplId)) {
                       return OtherSuggestions[i];
                   }
               }
               return null;
           },
           closeSuggestion: closeSuggestion,
           satisfyTeacherSuggestion: satisfyTeacherSuggestion,
           reOpenSuggestion: reOpenSuggestion,
           closeOtherSuggestion: closeOtherSuggestion,
           reOpenOtherSuggestion: reOpenOtherSuggestion,
           satisfyOtherSuggestion: satisfyOtherSuggestion
       }
   })