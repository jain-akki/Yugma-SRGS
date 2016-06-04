angular.module('yugma')

  .factory("notificationService", function ($http, $q, $ionicPlatform, baseUrl, $ionicPush, $localStorage, USER) {

    var notification = function () {

      $ionicPlatform.ready(function () {

        $ionicPush.init({
          "debug": true,
          "onNotification": function (notification) {
            var payload = notification.payload;
          },
          "onRegister": function (data) {
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

      var data = {};

      angular.extend(data, {
        id: parentId,
        name: token._token
      });

      $http({
        method: 'PUT',
        contentType: 'application/json',
        data: data,
        url: baseUrl + "/add-app-token"
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