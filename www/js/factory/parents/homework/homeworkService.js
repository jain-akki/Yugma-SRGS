angular.module("yugma")

  .factory('homeworkService', function ($http, $q, baseUrl) {

    var getHomework = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + '/parent/homework/' + id
      }).success(function (response) {
        TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    return {
      getHomework: getHomework
    }

  })