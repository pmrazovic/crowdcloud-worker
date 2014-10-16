servicesModule.service('ConnectionService', function () {
  this.backendHost = "crowdcloud.herokuapp.com";
  this.backendApiUrl = this.backendHost + "/api";
});