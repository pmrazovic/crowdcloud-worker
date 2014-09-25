angular.module('starter.controllers', [])

.controller('AppController', function($scope) {
})

.controller('DashboardController', function($scope, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    $scope.test = 'Device Name: '     + device.name     + '<br />' +
                  'Device Cordova: '  + device.cordova  + '<br />' +
                  'Device Platform: ' + device.platform + '<br />' +
                  'Device UUID: '     + device.uuid     + '<br />' +
                  'Device Model: '    + device.model    + '<br />' +
                  'Device Version: '  + device.version  + '<br />';
  });

})