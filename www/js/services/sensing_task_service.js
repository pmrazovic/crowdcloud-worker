servicesModule.service('SensingTask', function ($q, $http, SensingResponseService, ConnectionService, ConfigurationService) {
  var url = ConnectionService.backendApiUrl + "/sensing_tasks";
  this.getAll = function (page) {
    var _url = url + "?page=" + page.toString() + "&device_id=" + ConfigurationService.get("reg_id");
    return $http.get(_url, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.get = function (id) {
    var _url = url + '/' + id + "?device_id=" + ConfigurationService.get("reg_id");
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.fetchSensingDataTypes = function () {
    var _url = ConnectionService.backendApiUrl + "/fetch_sensing_data_types";
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.getAllResponses = function (id, page) {
    var _url = url + '/' + id + "/responses" + "?page=" + page.toString();
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.getResponse = function (taskId, responseId) {
    var _url = url + '/' + taskId + "/responses/" + responseId;
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.respond = function (id, sensing_data_types) {
    var _url = ConnectionService.backendApiUrl + "/sensing_responses";
    var q = $q.defer();
    SensingResponseService.readSensorData(sensing_data_types).then(function (data) {
      data.task_id = id.toString();
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

  this.publish = function (sensing_task) {
    return $http.post(url, sensing_task, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }
});