angular.module("yugma")

   .factory('complaintService', function ($http, $q, baseUrl, customService) {

      var TeacherComplaints = [];

      var getTeacherComplaint = function (id) {

         var deferred = $q.defer();

         $http({
            method: "GET",
            contentType: "application/json",
            url: baseUrl + "/teacher-complaint/" + id
         }).success(function (response) {
            TeacherComplaints = response;
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;
      }

      var getOtherComplaint = function (id) {

         var deferred = $q.defer();

         $http({
            method: "GET",
            contentType: "application/json",
            url: baseUrl + "/complaint/" + id
         }).success(function (response) {
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
            url: baseUrl + "/fetchParentCategory"
         }).success(function (response) {
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;
      }

      var saveTeacherComplaint = function (data) {

         var deferred = $q.defer();

         $http({
            method: 'POST',
            contentType: 'application/json',
            data: data,
            url: baseUrl + "/save-complaint"
         }).success(function (response) {
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;
      }

      var closeComplaint = function (data) {

         var deferred = $q.defer();

         $http({
            method: "PUT",
            contentType: "application/json",
            data: data,
            url: baseUrl + "/teacher-complaint-close"
         }).success(function (response) {
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;

      }

      var satisfyTeacherComplaint = function (complaintId) {

         var deferred = $q.defer();

         $http({
            method: "GET",
            contentType: "application/json",
            url: baseUrl + "/teacher-complaint-close/" + complaintId
         }).success(function (response) {
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;

      }

      var reOpenComplaint = function (data) {

         var deferred = $q.defer();

         $http({
            method: "PUT",
            contentType: "application/json",
            data: data,
            url: baseUrl + "/teacher-complaint-reopen"
         }).success(function (response) {
            deferred.resolve(response);
         }).error(function (response) {
            deferred.reject(response);
         });

         return deferred.promise;

      }

      return {
         getTeacherComplaint: getTeacherComplaint,
         getOtherComplaint: getOtherComplaint,
         viewTeacherComplaint: function (cmplId) {
            for (var i = 0; i < TeacherComplaints.length; i++) {
               if (TeacherComplaints[i].id === parseInt(cmplId)) {
                  return TeacherComplaints[i];
               }
            }
            return null;
         },
         getTeacher: getTeacher,
         getAllCategory: getAllCategory,
         saveTeacherComplaint: saveTeacherComplaint,
         closeComplaint: closeComplaint,
         satisfyTeacherComplaint: satisfyTeacherComplaint,
         reOpenComplaint: reOpenComplaint
      }
   })