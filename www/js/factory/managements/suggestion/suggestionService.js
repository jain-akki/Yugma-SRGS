(function () {
  
    "use strict";
  
    angular.module("yugma")

    .factory('managementSuggestionService', function ($http, $q, baseUrl, customService) {

        var TeacherSuggestions = [];

        var getDirectorTeacherSuggestions = function () {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/director/teacher-suggestion"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getAdminTeacherSuggestions = function (standardId, employeeId) {

            var deferred = $q.defer();
            console.log('standardId: ', standardId);
            console.log('employeeId: ', employeeId);
            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/management/fetch-teacher-suggestion/" + standardId + "/" + employeeId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var viewTeacherSuggestion = function (suggestionId) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/management/teacher-suggestion/" + suggestionId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var closeTeacherSuggestion = function (data) {

            var deferred = $q.defer();
 
            $http({
                method: 'PUT',
                contentType: 'application/json',
                data: data,
                url: baseUrl + "/management/teacher/suggestion-close"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var closeOtherSuggestion = function (params) {

            var deferred = $q.defer();
            console.log('data2: ', params);
            $http({
                method: 'PUT',
                contentType: 'application/json',
                data: params,
                url: baseUrl + "/management/suggestion-close"
            }).success(function (response) {
                console.log('success: ', response);
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getTeacherSuggestions = function (id) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/teacher/fetch-suggestion-by-teacher-id/" + id
            }).success(function (response) {
                TeacherSuggestions = response;
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

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

        var getChildrens = function (standardId) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/fetch-child-by-standard/" + standardId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var saveSuggestionByTeacher = function (data) {

            var deferred = $q.defer();
            console.log('data', data);
            $http({
                method: "POST",
                contentType: "application/json",
                data: data,
                url: baseUrl + "/add-student-suggestion"
            }).success(function (response) {
                console.log('success', response);
                deferred.resolve(response);
            }).error(function (response) {
                console.log('err');
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getSuggestionByTeacher = function (teacherId) {

            var deferred = $q.defer();
            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/student-suggestion-by-teacher/" + teacherId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                console.log('err');
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getAuthors = function () {

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

        var getPriorities = function () {

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

        var assignOtherSuggestion = function (suggestionId, assignedTo) {

            var deferred = $q.defer();

            $http({
                method: "PUT",
                contentType: "application/json",
                url: baseUrl + "/management/suggestion-assign/" + suggestionId + "/" + assignedTo
            }).success(function (response) {
                console.log("response from assign suggestion", response)
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var setOtherPriority = function (suggestionId, priorityId) {

            var deferred = $q.defer();

            $http({
                method: "PUT",
                contentType: "application/json",
                url: baseUrl + "/management/suggestion-priority/" + suggestionId + "/" + priorityId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var setOtherStatus = function (suggestionId, statusId) {

            var deferred = $q.defer();

            $http({
                method: "PUT",
                contentType: "application/json",
                url: baseUrl + "/management/suggestion-status/" + suggestionId + "/" + statusId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var assignSuggestion = function (suggestionId, assignedTo) {

            var deferred = $q.defer();
            console.log('suggestionId: ', suggestionId)
            console.log('assignedTo: ', assignedTo)
            $http({
                method: "PUT",
                contentType: "application/json",
                url: baseUrl + "/teacher/suggestion-assign/" + suggestionId + "/" + assignedTo
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var setPriority = function (suggestionId, priorityId) {

            var deferred = $q.defer();
            console.log('suggestionId: ', suggestionId)
            console.log('assignedTo: ', priorityId)
            $http({
                method: "PUT",
                contentType: "application/json",
                url: baseUrl + "/teacher/suggestion-priority/" + suggestionId + "/" + priorityId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var setStatus = function (suggestionId, statusId) {

            var deferred = $q.defer();
            console.log('suggestionId: ', suggestionId)
            console.log('assignedTo: ', statusId)
            $http({
                method: "PUT",
                contentType: "application/json",
                url: baseUrl + "/teacher/suggestion-status/" + suggestionId + "/" + statusId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;

        }

        var getDirectorOtherSuggestion = function (id) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/director/suggestion"
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
                alert("error")
            });

            return deferred.promise;
        }

        var getAdminOtherSuggestion = function (categoryIds, standardIds) {

            console.log("cat : ", categoryIds);
            console.log("sta : ", standardIds);
            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/management/fetch-suggestion/" + categoryIds + "/" + standardIds
            }).success(function (response) {
                console.log('response-1: ', response);
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            }).then(function (response) {
                console.log('response-2: ', response);
            });

            return deferred.promise;
        }        

        var viewOtherSuggestion = function (suggestionId) {

            var deferred = $q.defer();

            $http({
                method: "GET",
                contentType: "application/json",
                url: baseUrl + "/management/suggestion/" + suggestionId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getDirectorTeacherAssignSuggestion = function (employeeId) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                contentType: 'application/json',
                url: baseUrl + "/director/teacher-assign-suggestion/" + employeeId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getAdminTeacherAssignSuggestion = function (employeeId) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                contentType: 'application/json',
                dataType: 'jsonp',
                url: baseUrl + "/management/fetch-assign-teacher-suggestion/" + employeeId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getDirectorOtherAssignSuggestion = function (employeeId) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                contentType: 'application/json',
                url: baseUrl + "/director/assign-suggestion/" + employeeId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        var getAdminOtherAssignSuggestion = function (employeeId) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                contentType: 'application/json',
                url: baseUrl + "/management/fetch-assign-suggestion/" + employeeId
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        return {
            getDirectorTeacherSuggestions: getDirectorTeacherSuggestions,
            getAdminTeacherSuggestions: getAdminTeacherSuggestions,
            viewTeacherSuggestion: viewTeacherSuggestion,
            closeTeacherSuggestion: closeTeacherSuggestion,
            closeOtherSuggestion: closeOtherSuggestion,
            getTeacherSuggestions: getTeacherSuggestions,
            getStandards: getStandards,
            getChildrens: getChildrens,
            saveSuggestionByTeacher: saveSuggestionByTeacher,
            getSuggestionByTeacher: getSuggestionByTeacher,
            getAuthors: getAuthors,
            getPriorities: getPriorities,
            assignOtherSuggestion: assignOtherSuggestion,
            setOtherPriority: setOtherPriority,
            setOtherStatus: setOtherStatus,
            assignSuggestion: assignSuggestion,
            setPriority: setPriority,
            setStatus: setStatus,
            getDirectorOtherSuggestion: getDirectorOtherSuggestion,
            getAdminOtherSuggestion: getAdminOtherSuggestion,
            viewOtherSuggestion: viewOtherSuggestion,
            getDirectorTeacherAssignSuggestion: getDirectorTeacherAssignSuggestion,
            getAdminTeacherAssignSuggestion: getAdminTeacherAssignSuggestion,
            getDirectorOtherAssignSuggestion: getDirectorOtherAssignSuggestion,
            getAdminOtherAssignSuggestion: getAdminOtherAssignSuggestion
        }

    })

})();