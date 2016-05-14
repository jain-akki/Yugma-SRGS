angular.module('yugma')

.config(function ($provide) {

  $provide.provider("USER", function () {

    return {
        $get: function($localStorage) {
            return {
                parentId: $localStorage.Id,
                parentName: $localStorage.Name,
                parentOtp: $localStorage.Otp
            };
        }
    };

  });
});