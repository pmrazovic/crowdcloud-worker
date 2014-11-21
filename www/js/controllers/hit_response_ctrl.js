controllersModule.controller('HitResponseController', function($scope, $ionicLoading, $ionicPopup, $stateParams, Hit) {
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-b"></i> Loading...'
    });
  };

  var hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.init = function () {
    showLoading();
    getHit();
  }

  var getHit = function () {
    Hit.get($stateParams.id).success(function (data) {
      hideLoading();
      $scope.hit = data;
    })
    .error(function (error) {
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: "Errors were encountered while loading HIT!",
        buttons: [ { text: 'Ok', type: 'button-dark' } ]
      });
    })
  }
  
})