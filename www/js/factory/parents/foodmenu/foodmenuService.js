angular.module("yugma")

  .factory('foodmenuService', function ($http, $q, baseUrl) {

    var getFoodmenu = function () {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: baseUrl + '/food-menu'
      }).success(function (response) {
        TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    return {
      getFoodmenu: getFoodmenu
    }

  })