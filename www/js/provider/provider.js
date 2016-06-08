angular.module('yugma')

.factory('USER', function ($http, $q, baseUrl, $localStorage) {
    
    var getParentId = function() {
        return $localStorage.Id;
    }
    
    var getParentName = function() {
        return $localStorage.parentName;
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
    
    var getSessionId = function() {
        return $localStorage.sessionId;
    }

    var getEmployeeName = function() {
        return $localStorage.employeeName;
    }
    
    var getToken = function() {
        return $localStorage.token;
    }

    return {
        parentName: getParentName,
        parentId: getParentId,
        parentOtp: getParentOtp,
        parentChilds: getParentChilds,
        parentEmail: getParentEmail,
        parentContact: getParentContact,
        sessionId: getSessionId,
        employeeName: getEmployeeName,
        token: getToken
    }
    
})