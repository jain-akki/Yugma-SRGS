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
         }
      }
   })