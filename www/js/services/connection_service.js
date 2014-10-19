servicesModule.service('ConnectionService', function () {
  this.backendHost = "http://crowdcloud.herokuapp.com";
  this.backendApiUrl = this.backendHost + "/api";
});