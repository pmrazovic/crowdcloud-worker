servicesModule.service('Hit', function ($q, $http, ResponseService, ConnectionService) {
  var url = ConnectionService.backendApiUrl + "/hits";
  this.getAll = function (page) {
    var _url = url + "?page=" + page.toString() + "&device_id=" + window.localStorage["reg_id"].toString();
    return $http.get(_url, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }

  this.get = function (id) {
    var _url = url + '/' + id + "?device_id=" + window.localStorage["reg_id"].toString();
    return $http.get(_url, {}, {headers: {'Accept' : 'application/json; charset=UTF-8'}})
  }
});