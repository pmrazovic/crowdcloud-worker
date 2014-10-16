servicesModule.service('OpenCall', function ($q, $http, ResponseService, ConnectionService) {
  var url = ConnectionService.backendApiUrl + "/open_calls";
  this.getAll = function (page) {
    return $http.get(url, {page: page}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.get = function (id) {
    return $http.get(url + '/' + id, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
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