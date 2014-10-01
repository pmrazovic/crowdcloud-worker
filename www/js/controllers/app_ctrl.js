controllersModule.controller('AppController', function($scope, $http, $ionicPlatform, PushService) {
  $ionicPlatform.ready(function () {
    PushService.initializePush();
  })
})