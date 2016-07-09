angular.module("yugma")

   .factory('respondService', function ($http, $q, baseUrl) {

       var setComment = function (data) {

           var deferred = $q.defer();
          
           $http({
               method: "POST",
               contentType: "application/json",
               data: data,
               url: baseUrl + "/teacher-suggestion/save-comment"
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;
       }

       var getComment = function (suggestionId) {

           var deferred = $q.defer();

           $http({
               method: 'GET',
               contentType: 'application/json',
               url: baseUrl + "/teacher-suggestion/comment/" + suggestionId
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var getOtherComment = function (suggestionId) {

           var deferred = $q.defer();

           $http({
               method: 'GET',
               contentType: 'application/json',
               url: baseUrl + "/suggestion/comment/" + suggestionId
           }).success(function (response) {
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;

       }

       var setOtherComment = function (data) {

           var deferred = $q.defer();

           $http({
               method: "POST",
               contentType: "application/json",
               data: data,
               url: baseUrl + "/suggestion/save-comment"
           }).success(function (response) {
               TeacherComplaints = response;
               deferred.resolve(response);
           }).error(function (response) {
               deferred.reject(response);
           });

           return deferred.promise;
       }

       return {
           setComment: setComment,
           getComment: getComment,
           getOtherComment: getOtherComment,
           setOtherComment: setOtherComment
       }

   })