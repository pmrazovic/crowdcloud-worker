controllersModule.controller('DashboardController', function($scope, $ionicLoading, $ionicPopup, $ionicPlatform, BackgroundLocationService, ConfigurationService) {
  $scope.backgroundTrackingEnabled = (ConfigurationService.get("background_tracking") === "true") || 
                                     (typeof ConfigurationService.get("background_tracking") === "undefined");

  $scope.toggleBackgroundTracking = function () {
    if (ConfigurationService.get("background_tracking") === "true") {
      BackgroundLocationService.stopTracking();
    } else {
      BackgroundLocationService.startTracking();
    }
  }
})