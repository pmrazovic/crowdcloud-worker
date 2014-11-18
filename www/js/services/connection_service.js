servicesModule.service('ConnectionService', function () {
  this.backendHost = "http://130.229.175.25:3000";
  this.backendApiUrl = this.backendHost + "/api";
});