(function () {

    "use strict";

    angular.module("yugma")

    .factory('managementpollService', function ($http, $q, baseUrl) {

        var fetchStandards = function () {

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

        var fetchOptionCategory = function () {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-option-category"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var fetchPollType = function () {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-poll-type"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var savePollData = function (data) {

            var deferred = $q.defer();
            
            $http({
                method: "POST",
                data: data,
                contentType: "application/json",
                url: baseUrl + "/add-poll"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var fetchPollResult = function (teacherId) {

            var deferred = $q.defer();
            
            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-poll-result-by-teacher/" + teacherId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        return {
            fetchStandards: fetchStandards,
            fetchOptionCategory: fetchOptionCategory,
            fetchPollType: fetchPollType,
            savePollData: savePollData,
            fetchPollResult: fetchPollResult
        }

    })

})();
