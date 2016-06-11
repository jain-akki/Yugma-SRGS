(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementComplaintService', function ($http, $q, baseUrl, customService) {

    var getDirectorTeacherComplaints = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/director/teacher-complaint"
      }).success(function (response) {
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
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
        alert("error")
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
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    var viewTeacherComplaint = function(complaintId) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/teacher-complaint/" + complaintId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }
    
    var viewOtherComplaint = function (complaintId) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/other-complaint/" + complaintId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var getAuthors = function() {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/assign"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }
    
    var getPriorities = function() {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/priority"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    var assignComplaint = function(complaintId, assignId) {

      var deferred = $q.defer();

      $http({
        method: "PUT",
        contentType: "application/json",
        url: baseUrl + "/management/teacher/complaint-assign/" + complaintId + "/"+ assignId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    var setPriority = function(complaintId, priorityId) {

      var deferred = $q.defer();

      $http({
        method: "PUT",
        contentType: "application/json",
        url: baseUrl + "/management/teacher/complaint-priority/" + complaintId + "/" + priorityId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    var setStatus = function(complaintId, statusId) {

      var deferred = $q.defer();

      $http({
        method: "PUT",
        contentType: "application/json",
        url: baseUrl + "/management/teacher/complaint-status/" + complaintId + "/" + statusId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    var assignOtherComplaint = function(complaintId, assignId) {

      var deferred = $q.defer();

      $http({
        method: "PUT",
        contentType: "application/json",
        url: baseUrl + "/management/other-complaint-assign/" + complaintId + "/"+ assignId
      }).success(function (response) {
        console.log("response from assign complaint", response)
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    var setOtherPriority = function(complaintId, priorityId) {

      var deferred = $q.defer();

      $http({
        method: "PUT",
        contentType: "application/json",
        url: baseUrl + "/management/other-complaint-priority/" + complaintId + "/" + priorityId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    var setOtherStatus = function(complaintId, statusId) {

      var deferred = $q.defer();

      $http({
        method: "PUT",
        contentType: "application/json",
        url: baseUrl + "/management/other-complaint-status/" + complaintId + "/" + statusId
      }).success(function (response) {
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
      getAdminOtheComplaints: getAdminOtheComplaints,
      viewTeacherComplaint: viewTeacherComplaint,
      viewOtherComplaint: viewOtherComplaint,
      getAuthors: getAuthors,
      getPriorities: getPriorities,
      assignComplaint: assignComplaint,
      setPriority: setPriority,
      setStatus: setStatus,
      assignOtherComplaint: assignOtherComplaint,
      setOtherPriority: setOtherPriority,
      setOtherStatus: setOtherStatus
    }

  })

})();