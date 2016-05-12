angular.module('yugma.services', [])

.factory('Chats', function() {

  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 3,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service("AuthService", function($q, $http) {
  
  var LOCAL_TOKEN_KEY = "yourTokenKey";
  var username = "";
  var authToken;
  var isAuthenticated = false;
  
  function loadUserCrendentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      userCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    userCredentials(token);
  }

  function userCredentials(token) {
    username = token.split(".")[0];
    isAuthenticated = true;
    authToken = token;
    $http.defaults.headers.common["X-Auth-Token"] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = "";
    isAuthenticated = false;
    $http.defaults.headers.common["X-Auth-Token"] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  loadUserCrendentials();

  var login = function(name, pw) {
    
    return $q(function(resolve, reject) {
      
      if((name === "admin" && pw === "1") || (name === "user" && pw === "1")) {
        storeUserCredentials(name + ".yourServerTokenKey");
        resolve("Login Success.");
      } else {
        reject("Login Failed.");
      }

    });
  };

  var logout = function() {
    destroyUserCredentials();
  }

  return {
    login: login,
    logout: logout,
    isAuthenticated: function() { return isAuthenticated; }
  }

})
