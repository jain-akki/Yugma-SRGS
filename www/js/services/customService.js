angular.module('yugma')

.factory('customService', function($ionicLoading, $ionicPopup) {

    var _on = function() {
        $ionicLoading.show({
            content: 'android',
            // template: '<ion-spinner icon="android"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    }

    var _off = function() {
        $ionicLoading.hide();
    }

    var _showConfirm = function() {
        var logoutAlert = $ionicPopup.confirm({
            title: 'Attention please',
            template: 'Are you sure want logged out?',
            cssClass: 'confirmLogout'
        });
        return logoutAlert;
    }

    var _showAlert = function(Data) {
        var alertPopup = $ionicPopup.alert({
            title: Data.title,
            template: Data.template
        });
        return alertPopup;
    }

    return {
        _on: _on,
        _off: _off,
        _showConfirm: _showConfirm,
        _showAlert: _showAlert
    }

});