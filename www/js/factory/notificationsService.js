angular.module('yugma')

  .factory("notificationService", function ($http, $q, $ionicPlatform, baseUrl, $ionicPush, $localStorage, USER, customService) {

    var notification = function () {

      $ionicPlatform.ready(function () {

        $ionicPush.init({
          "debug": true,
          "onNotification": function (notification) {
            alert("notification received");
            var payload = notification.payload;
          },
          "onRegister": function (data) {
            $localStorage.token = data._token;
            saveGcmToken(USER.parentId(), data);
          },
          "pluginConfig": {
            "android": {
              "badge": true,
              "sound": true,
              "alert": true,
              "icon": "icon",
              "iconColor": "#948438"
            },
            "ios": {
              "badge": true,
              "sound": true,
              "alert": true
            }
          }
        });
        $ionicPush.register({
          canShowAlert: true,
          canSetBadge: true,
          canPlaySound: true,
          canRunActionsOnWake: true,
        });
      });
    }

    function saveGcmToken(parentId, token) {

      customService._off();
      var data = {};

      angular.extend(data, {
        id: parentId,
        name: token._token
      });
      
      var url ;
      if (USER.parentName()) {
        url = "/add-app-token";
      } else {
        url = "/management/add-app-token";
      }

      $http({
        method: 'PUT',
        contentType: 'application/json',
        data: data,
        url: baseUrl + url
      }).success(function (response) {
        alert("response from notification service" + JSON.stringify(response));
      }).error(function (response) {
        alert("Error " + JSON.stringify(response));
      });

    }

    return {
      notification: notification
    }

  })