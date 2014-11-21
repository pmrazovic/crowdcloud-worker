servicesModule.service('Hit', function ($q, $http, $cordovaDevice, SensingResponseService, ConnectionService) {
  var url = ConnectionService.backendApiUrl + "/hits";
  this.getAll = function (page) {
    var _url = url + "?page=" + page.toString() + "&device_id=" + window.localStorage["reg_id"].toString();
    return $http.get(_url, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.get = function (id) {
    var _url = url + '/' + id + "?device_id=" + window.localStorage["reg_id"].toString();
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.respond = function (id, choiceId, context_data_types) {
    var _url = ConnectionService.backendApiUrl + "/hit_responses";
    var q = $q.defer();
    SensingResponseService.readSensorData(context_data_types).then(function (data) {
      data.task_id = id.toString();
      data.device = { uuid: $cordovaDevice.getUUID() };
      data.choice_id = choiceId;
      $http.post(_url, data, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
      .success(function (data) {
        q.resolve();
      })
      .error(function (error) {
        q.reject(err);
      });
    });

    return q.promise;
  }

});