(function () {

    "use strict";

    angular.module("yugma")

    .factory('parentPollService', function ($http, $q, baseUrl) {

        var fetchPollsForParent = function (childStandardIds, user) {
            
            var deferred = $q.defer();
            console.log('childStandardIds ', childStandardIds, 'user ', user)
            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-poll-for-parent/" + childStandardIds + "/" + user
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var saveParentData = function (pollAnswer) {

            var deferred = $q.defer();
            
            $http({
                method: "POST",
                data: pollAnswer,
                contentType: "application/json",
                url: baseUrl + "/save-poll-result"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        return {
            fetchPollsForParent: fetchPollsForParent,
            saveParentData: saveParentData
        }
    })
})();
