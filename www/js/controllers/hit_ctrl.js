controllersModule.controller('HitController', function($scope, $ionicLoading, $ionicPopup, $stateParams, Hit) {
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-b"></i> Loading...'
    });
  };

  var hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.camelCase2Human = function(input) {
    return input.charAt(0).toUpperCase() + input.substr(1).replace(/[A-Z]/g, ' $&');
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