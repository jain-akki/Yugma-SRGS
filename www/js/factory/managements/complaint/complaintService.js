(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementComplaintService', function ($http, $q, baseUrl, customService) {

    var TeacherComplaints = [];

    var getDirectorTeacherComplaints = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/director/teacher-complaint"
      }).success(function (response) {
        TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    var getDirectorOtherComplaints = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/director/other-complaint"
      }).success(function (response) {
        TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var getAdminTeacherComplaints = function (standardId, employeeId) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/fetch-complaint/" + standardId + "/" + employeeId
      }).success(function (response) {
        TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var getAdminOtheComplaints = function (categoryIds, standardIds) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/fetch-other-complaint/" + categoryIds + "/" + standardIds
      }).success(function (response) {
        TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    return {
      getDirectorTeacherComplaints: getDirectorTeacherComplaints,
      getDirectorOtherComplaints: getDirectorOtherComplaints,
      getAdminTeacherComplaints: getAdminTeacherComplaints,
      getAdminOtheComplaints: getAdminOtheComplaints
    }

  })

})();