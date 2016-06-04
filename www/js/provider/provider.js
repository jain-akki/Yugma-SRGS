angular.module('yugma')

.factory('USER', function ($http, $q, baseUrl, $localStorage) {
    
    var getParentId = function() {
        return $localStorage.Id;
    }
    
    var getParentName = function() {
        return $localStorage.Name;
    }
    
    var getParentOtp = function() {
        return $localStorage.Otp;
    }
    
    var getParentChilds = function() {
        return $localStorage.childs;
    }
    
    var getParentEmail = function() {
        return $localStorage.Email;
    }
    
    var getParentContact = function() {
        return $localStorage.Contact;
    }
    
    return {
        parentName: getParentName,
        parentId: getParentId,
        parentOtp: getParentOtp,
        parentChilds: getParentChilds,
        parentEmail: getParentEmail,
        parentContact: getParentContact
    }
    
})