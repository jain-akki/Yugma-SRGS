angular.module("yugma")

.factory('authService', function ($http, $q, baseUrl, $localStorage, customService, USER, $window, $ionicPush, notificationService) {

    var isAuthenticated = false;

    function storeUserCredentials(data) {
        $localStorage.Id = data.parentId;
        $localStorage.Otp = data.parentOtp;
        $localStorage.sessionId = data.sessionId;
        $localStorage.parentName = data.parentName;
        $localStorage.Email = data.parentEmail;
        $localStorage.Contact = data.parentContact;
        notificationService.notification("parents");
        userCredentials(data.parentId, data.parentOtp);
    }

    function storeManagementCredentials(data) {
        $localStorage.sessionData = data;
        $localStorage.employeeName = data.employeeName;
        $localStorage.sessionId = data.sessionId;
        $localStorage.Id = data.employeeId;
        notificationService.notification("management");
        userCredentials(data.employeeId, data.employeeName);
    }

    function userCredentials(id, otp) {
        isAuthenticated = true;
        $http.defaults.headers.common["X-Auth-Token"] = id + otp;
    }

    function loadUserCrendentials() {

        if (USER.parentName()) {

            checkParentSession().then(function(response) {

                if (response !== USER.token()) {

                    var Data = {
                        template: "Your session has been expired."
                    }
                    customService._showAlert(Data).then(function (res) {
                        logout();
                    });
                }
            });

        } else if(USER.employeeName()) {

            checkManagementSession().then(function(response) {

                if (response !== USER.token()) {

                    var Data = {
                        template: "Your session has been expired."
                    }
                    customService._showAlert(Data).then(function (res) {
                        logout();
                    });
                }
            });
        }

        if ($localStorage.Id || $localStorage.Otp) {
            userCredentials($localStorage.Id, $localStorage.Otp);
        }
    }

    function checkManagementSession() {

        var deferred = $q.defer();
        console.log("id", USER.parentId())
        $http({
            method: 'GET',
            contentType: 'application/json',
            url: baseUrl + "/management/session-check/" + USER.parentId()
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    function checkParentSession() {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            contentType: 'application/json',
            url: baseUrl + "/parent/session-check/" + USER.parentId()
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    loadUserCrendentials();

    function destroyUserCredentials() {
        $localStorage.$reset();
        $ionicPush.unregister();
        isAuthenticated = false;
        $http.defaults.headers.common["X-Auth-Token"] = undefined;
    }
    
    function getChilds(id) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            contentType: 'application/json',
            url: baseUrl + "/fetchChild/" + id
        }).success(function (response) {
            $localStorage.childs = response;
            deferred.resolve(response);
        }).error(function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    var getOtp = function (number) {

        var deferred = $q.defer();

        var alertData = {
            template : "Number not registered."
        };

        $http({

            method: 'GET',
            contentType: 'application/json',
            url: baseUrl + "/login/" + number.toString()

        }).success(function (response) {

            if (_.isString(response)) {
                customService._showAlert(alertData);
            }

            deferred.resolve(response);

        }).error(function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    var verifyOtp = function(otp, parentsData) {

        return $q(function(resolve, reject) {

            if (otp === parentsData.parentOtp) {
                getChilds(parentsData.parentId);
                storeUserCredentials(parentsData);
                resolve("Login Success.");
            } else {
                reject("Login Failed.");
            }
        });
    }

    var logout = function() {
        destroyUserCredentials();
        $window.location.reload(true);
    }

    var managementAuth = function(data) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
            contentType: 'application/json',
            data: data,
            url: baseUrl + "/management-login"
        }).success(function (response) {
            if (typeof response === "object") {
                storeManagementCredentials(response);   
            }
            deferred.resolve(response);
        }).error(function (response) {
            deferred.reject(response);
        });

        return deferred.promise;

    }
    
    return {
        getOtp: getOtp,
        verifyOtp: verifyOtp,
        logout: logout,
        managementAuth: managementAuth,
        isAuthenticated: function() { return isAuthenticated; }
    }
})