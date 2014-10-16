servicesModule.service('RegistrationService', function ($q, $http, $cordovaDevice, ConnectionService) {
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
        window.localStorage["reg_id"] = data["reg_id"];
      })
  }
});