(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementHomeworkService', function ($http, $q, baseUrl) {

    var dueHomework = [];

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

    var dueHomework = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + "/management/homework/"+ id
      }).success(function (response) {
        dueHomework = response;
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

    var updateDesc = function (params) {
 
      var deferred = $q.defer();

      $http({
        method: 'PUT',
        contentType: 'application/json',
        data: params,
        url: baseUrl + "/management/homework/description"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var updateDueDate = function (params) {

      var deferred = $q.defer();

      $http({
        method: 'PUT',
        contentType: 'application/json',
        data: params,
        url: baseUrl + "/management/homework/due-date"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    return {
      getStandards: getStandards,
      dueHomework: dueHomework,
      addHomework: addHomework,
      viewHomework:function (homeworkId) {
        for (var i = 0; i < dueHomework.length; i++) {
          if (dueHomework[i].homeworkId === parseInt(homeworkId)) {
            return dueHomework[i];
          }
        }
        return null;
      },
      updateDesc: updateDesc,
      updateDueDate: updateDueDate
    }

  });

})();