angular.module('starter.controllers', [])

.controller('AppController', function($scope) {
})

.controller('DashboardController', function($scope, $http, $ionicLoading, $ionicPopup, $ionicPlatform) {
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-b"></i> Loading...'
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $ionicPlatform.ready(function () {
    var _pushId = '';
    PushNotification.getPushID(function(pushId) {
      _pushId = pushId;
    });

    $scope.register = function() {
      $scope.showLoading();
      var _params = { uuid:     device.uuid,
                      name:     device.name,
                      platform: device.platform,
                      model:    device.model,
                      version:  device.version,
                      pushId:     _pushId }
      $http.post("http://192.168.1.78:3000/devices/register", _params, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
        .success(function (data) {
          var successPopup = $ionicPopup.alert({
            title: 'Successful registration',
            template: 'Your device is successfuly registered in CrowdCloud!',
            buttons: [{
                text: 'OK',
                type: 'button-dark'
              }]
          });
        })
        .error(function (data) {
          var errorPopup = $ionicPopup.alert({
            title: 'Registration error',
            template: 'Your device could not be registered in CrowdCloud!',
            buttons: [{
                text: 'OK',
                type: 'button-dark'
              }]
          });
        })
        .finally(function() {
          $scope.hideLoading();
        });
    };
  })


})