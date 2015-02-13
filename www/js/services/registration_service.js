servicesModule.service('RegistrationService', function ($q, $http, $cordovaDevice, ConnectionService, BackgroundLocationService, ConfigurationService) {
  var url = ConnectionService.backendApiUrl + "/devices/register";
  this.registerDevice = function (push_id) {
    var params = { uuid:     $cordovaDevice.getUUID(),
                   platform: $cordovaDevice.getPlatform(),
                   model:    $cordovaDevice.getModel(),
                   version:  $cordovaDevice.getVersion(),
                   push_id:  push_id,
                   sensors:  SensingAbility.sensors };
    $http.post(url, params, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
      .success(function (data) {
        ConfigurationService.set("reg_id", data["reg_id"]);
        if (ConfigurationService.get("background_tracking") !== "false") {
          BackgroundLocationService.startTracking();
        }
      })
  }
});