angular.module("yugma")

.factory('authService', function ($http, $q, baseUrl, $localStorage, customService) {

    var isAuthenticated = false;

    function storeUserCredentials(data) {
        $localStorage.Id = data.parentId;
        $localStorage.Otp = data.parentOtp;
        $localStorage.Name = data.parentName; 
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

    var getOtp = function (number) {

        var deferred = $q.defer();

        var alertData = {
            title: 	"Login Failed",
            template : "You enter wrong number."
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
                storeUserCredentials(parentsData);
                resolve("Login Success.");
            } else {
                reject("Login Failed.");
            }
        });
    }
    
    var logout = function() {
        destroyUserCredentials();
    }

    return {
        getOtp: getOtp,
        verifyOtp: verifyOtp,
        logout: logout,
        isAuthenticated: function() { return isAuthenticated; }
    }
})