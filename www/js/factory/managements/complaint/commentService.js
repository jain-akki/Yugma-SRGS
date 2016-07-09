(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementCommentService', function ($http, $q, baseUrl, customService) {


    var getTeacherComments = function(complaintId) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'jsonp',
        url: baseUrl + "/management/teacher-complaint/comment/" + complaintId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }
    
    var getOtherComments = function(complaintId) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'jsonp',
        url: baseUrl + "/management/other-complaint/comment/" + complaintId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;      
    }

    var saveOtherComment = function (params) {

      var deferred = $q.defer();

      $http({
        method: 'POST',
        contentType: 'application/json',
        data: params,
        url: baseUrl + "/management/other/save-comment"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    var saveTeacherComment = function (params) {

      var deferred = $q.defer();

      $http({
        method: 'POST',
        contentType: 'application/json',
        data: params,
        url: baseUrl + "/management/teacher/save-comment"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }

    return {
      getTeacherComments: getTeacherComments,
      getOtherComments: getOtherComments,
      saveTeacherComment: saveTeacherComment,
      saveOtherComment: saveOtherComment
    }
 
  });

})();