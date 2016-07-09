angular.module("yugma")

  .factory('timetableService', function ($http, $q, baseUrl) {

    var getTimetable = function (id) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        contentType: 'application/json',
        url: baseUrl + '/time-table/' + id
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    return {
      getTimetable: getTimetable
    }

  })