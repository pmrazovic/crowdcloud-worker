servicesModule.service('SensingResponseService', function ($q, $rootScope, $cordovaDevice, $cordovaGeolocation, $cordovaDeviceMotion, $cordovaDeviceOrientation) {
  this.readSensorData = function (sensing_data_types) {
    var responseItems = [];
    
    var defer = $q.defer();
    var promises = [];

    function lastTask () {
      var response = { device: { uuid: $cordovaDevice.getUUID() },
                       sensing_response_items: responseItems };
      defer.resolve(response);
    }

    for (i = 0; i < sensing_data_types.length; ++i) {

      switch(sensing_data_types[i]) 
      {
        case 'GeoLocationData':
          promises.push($cordovaGeolocation
            .getCurrentPosition({ enableHighAccuracy: true })
            .then(function (position) {
              var responseItem = { 'GeoLocationData':
                                    {
                                      latitude:           position.coords.latitude,
                                      longitude:          position.coords.longitude,
                                      altitude:           position.coords.altitude,
                                      accuracy:           position.coords.accuracy,
                                      altitude_accuracy:  position.coords.altitudeAccuracy,
                                      heading:            position.coords.heading,
                                      speed:              position.coords.speed
                                    }
                                 };
              responseItems.push(responseItem);
            }));        
        break;

        case 'MotionData':
          promises.push($cordovaDeviceMotion
            .getCurrentAcceleration({ enableHighAccuracy: true })
            .then(function(acceleration) {
              var responseItem = { 'MotionData':
                                    {
                                      acceleration_x: acceleration.x,
                                      acceleration_y: acceleration.y,
                                      acceleration_z: acceleration.z
                                    }
                                 };
              responseItems.push(responseItem);
          }));
        break;

        case 'OrientationData':
          promises.push($cordovaDeviceOrientation
            .getCurrentHeading()
            .then(function(heading) {
              var responseItem = { 'OrientationData':
                                    { magnetic_heading: heading.magneticHeading }
                                 };
              responseItems.push(responseItem); 
          }));
        break;

        case 'AirPressureData':
        break;

        case 'AcousticData':
        break;

        case 'LightData':
          var q = $q.defer();
          navigator.LightSensor.getCurrentLumen(function (result) {
            var responseItem = { 'LightData':
                                  { lumen: result.value }
                               };
            responseItems.push(responseItem);
            q.resolve();
          }, function (err) {
            q.reject(err);
          });
          promises.push(q.promise);

        break;

        case 'TemperatureData':
        break;

        default:
        break;
      }

    }

    $q.all(promises).then(lastTask);

    return defer.promise;

  }
})