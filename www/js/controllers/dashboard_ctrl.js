controllersModule.controller('DashboardController', function($scope, $http, $ionicLoading, $ionicPopup, $ionicPlatform, PushService) {
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-b"></i> Loading...'
    });
  };

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.register = function() {
    $scope.showLoading();
    PushService.getPushId().then(function (_pushId) {
      var _params = { uuid:     device.uuid,
                      name:     device.name,
                      platform: device.platform,
                      model:    device.model,
                      version:  device.version,
                      push_id:     _pushId }
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
      })
    .finally(function() {
      $scope.hideLoading();
    });
  };


})