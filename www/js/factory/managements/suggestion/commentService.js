(function () {
  
  "use strict";
  
  angular.module("yugma")

  .factory('managementSuggestionCommentService', function ($http, $q, baseUrl, customService) {


    var getTeacherComments = function(suggestionId) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'jsonp',
        url: baseUrl + "/management/teacher-suggestion/comment/" + suggestionId
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }
    
    var getOtherComments = function (suggestionId) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'jsonp',
        url: baseUrl + "/management/suggestion/comment/" + suggestionId
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
        url: baseUrl + "/management/save-suggestion-comment"
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
        url: baseUrl + "/management/teacher/save-suggestion-comment"
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