angular.module("yugma")

   .factory('commentService', function ($http, $q, baseUrl) {

      var setComment = function (data) {

         var deferred = $q.defer();

         $http({
            method: "POST",
            contentType: "application/json",
            data: data,
            url: baseUrl + "/teacher-complaint/save-comment"
         }).success(function (response) {
            TeacherComplaints = response;
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;
      }

      var getComment = function (complaintId) {

         var deferred = $q.defer();

         $http({
            method: 'GET',
            contentType: 'application/json',
            url: baseUrl + "/teacher-complaint/comment/" + complaintId
         }).success(function (response) {
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;

      }

      return {
         setComment: setComment,
         getComment: getComment
      }

   })