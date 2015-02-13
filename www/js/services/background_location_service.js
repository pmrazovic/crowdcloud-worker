servicesModule.service('BackgroundLocationService', function (ConnectionService, $cordovaBackgroundGeolocation, ConfigurationService) {

  this.startTracking = function() {
    var options = {
      url: (ConnectionService.backendApiUrl + '/devices/background_tracking'),
      params: {
        id: ConfigurationService.get("reg_id")
      },
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 30,
      locationTimeout: 5,
      notificationTitle: 'MobiCS - Background tracking',
      notificationText: 'ENABLED',
      activityType: 'AutomotiveNavigation',
      debug: true,
      stopOnTerminate: false
    }

    $cordovaBackgroundGeolocation.configure(options)
    .then(
      null, // Background never resolves
      function (err) { // error callback
        console.error(err);
      },
      function (location) { // notify callback
        console.log(location);
      });
    ConfigurationService.set("background_tracking", "true");
  }

  this.stopTracking = function () {
    $cordovaBackgroundGeolocation.stop();
    ConfigurationService.set("background_tracking", "false");
  }

});