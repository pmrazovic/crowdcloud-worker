servicesModule.service('ResponseService', function ($q, $rootScope, $cordovaDevice, $cordovaGeolocation) {
  this.readSensorData = function (response_data_types) {
    var responseItems = [];
    
    var defer = $q.defer();
    var promises = [];

    function lastTask () {
      var response = { response_items: responseItems };
      defer.resolve(response);
    }

    for (i = 0; i < response_data_types.length; ++i) {

      switch(response_data_types[i]) 
      {
        case 'GeoLocationData':
          promises.push($cordovaGeolocation
            .getCurrentPosition()
            .then(function (position) {
              var responseItem = { 'GeoLocationData':
                                    {
                                      latitude:           position.coords.latitude,
                                      longitude:          position.coords.longitude,
                                      altitude:           position.coords.altitude,
                                      accuracy:           position.coords.accuracy,
                                      altitude_accuracy:  position.coords.altitudeAccuracy,
                                      heading:            position.coords.heading,
                                      speed:              position.coords.speed,
                                      timestamp:          position.timestamp 
                                    }
                                 };
              responseItems.push(responseItem);
            }));        
        break;

        case 'AccelerationData':
        break;

        case 'OrientationData':
        break;

        case 'AirPressureData':
        break;

        case 'AcousticData':
        break;

        case 'IlluminationData':
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