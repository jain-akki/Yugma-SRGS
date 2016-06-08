(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementComplaintService', function ($http, $q, baseUrl, customService) {

    var TeacherComplaints = [];

    var getTeacherComplaints = function (id) {

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
    
    var getOtherComplaints = function (id) {

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

    return {
      getTeacherComplaints: getTeacherComplaints,
      getOtherComplaints: getOtherComplaints
    }

  })

})();