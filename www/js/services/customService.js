angular.module('yugma')

    .factory('customService', function ($ionicLoading, $ionicPopup, $q) {

        var _on = function () {
            $ionicLoading.show({
                content: 'android',
                // template: '<ion-spinner icon="android"></ion-spinner>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        }

        var _off = function () {
            $ionicLoading.hide();
        }

        var _showConfirm = function (data) {
            var confirmPopup = $ionicPopup.confirm({
                title: data.title,
                template: data.template,
                cssClass: 'customConfirm'
            });
            return confirmPopup;
        }

        var _showAlert = function (data) {
            var alertPopup = $ionicPopup.alert({
                title: data.title,
                template: data.template,
                cssClass: 'customAlert'
            });
            return alertPopup;
        }

        var _showPopup = function (data) {

            var deferred = $q.defer();

            $ionicPopup.show({
                template: data.template,
                title: data.title,
                scope: data.scope,
                buttons: [{
                    text: 'Cancel',
                    onTap: function (e) {
                        data.scope[data.modelName] = {};
                        return false;
                }}, {
                    text: 'Close',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!data.scope[data.modelName].comment) {
                            e.preventDefault();
                        } else {
                            return data.scope[data.modelName];
                        }
                }}]
            }).then(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        return {
            _on: _on,
            _off: _off,
            _showConfirm: _showConfirm,
            _showAlert: _showAlert,
            _showPopup: _showPopup
        }

    });