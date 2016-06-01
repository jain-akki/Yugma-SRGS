angular.module("yugma")

.factory('authService', function ($http, $q, baseUrl, $localStorage, customService, USER, $window, $ionicPush, notificationService) {

    var isAuthenticated = false;

    function storeUserCredentials(data) {
        $localStorage.Id = data.parentId;
        $localStorage.Otp = data.parentOtp;
        $localStorage.Name = data.parentName;
        $localStorage.Email = data.parentEmail;
        $localStorage.Contact = data.parentContact;
        notificationService.notification();
        userCredentials($localStorage.Id, $localStorage.Otp);
    }

    function userCredentials(id, otp) {
        isAuthenticated = true;
        $http.defaults.headers.common["X-Auth-Token"] = id + otp;
    }

    function loadUserCrendentials() {
        if ($localStorage.Id && $localStorage.Otp) {
            userCredentials($localStorage.Id, $localStorage.Otp);
        }
    }

    loadUserCrendentials();

    function destroyUserCredentials() {
        $localStorage.$reset();
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
    
    return {
        getOtp: getOtp,
        verifyOtp: verifyOtp,
        logout: logout,
        isAuthenticated: function() { return isAuthenticated; }
    }
})