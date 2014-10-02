servicesModule.service('RegistrationService', function ($q, $http, $rootScope, $ionicPlatform, $cordovaDevice, $cordovaSplashscreen) {
  this.registerDevice = function (push_id) {
    var _params = { uuid:     $cordovaDevice.getUUID(),
                    platform: $cordovaDevice.getPlatform(),
                    model:    $cordovaDevice.getModel(),
                    version:  $cordovaDevice.getVersion(),
                    push_id:  push_id };
    $http.post("http://130.229.188.67:3000/devices/register", _params, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
      .success(function (data) {
        window.localStorage["reg_id"] = data["reg_id"];
      })
  }
});