(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementHomeworkService', function ($http, $q, baseUrl) {

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

    var getHomework = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/homework/"+ id
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var addHomework = function (params) {

      var deferred = $q.defer();

      $http({
        method: 'POST',
        contentType: 'application/json',
        data: params,
        url: baseUrl + "/management/save-homework"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var getHomework = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/homework/"+ id
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    return {
      getStandards: getStandards,
      getHomework: getHomework,
      addHomework: addHomework,
      getHomework: getHomework
    }

  });

})();