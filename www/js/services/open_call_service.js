servicesModule.service('OpenCall', function ($q, $http, ResponseService, ConnectionService) {
  var url = ConnectionService.backendApiUrl + "/open_calls";
  this.getAll = function (page) {
    var _url = url + "?page=" + page.toString() + "&device_id=" + window.localStorage["reg_id"].toString();
    return $http.get(_url, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.get = function (id) {
    var _url = url + '/' + id + "?device_id=" + window.localStorage["reg_id"].toString();
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.respond = function (id, response_data_types) {
    var _url = url + "/" + id.toString() + "/responses";
    var q = $q.defer();
    ResponseService.readSensorData(response_data_types).then(function (data) {
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