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
    $scope.radioData = {
      choiceId: null
    };
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

  $scope.respond = function () {
    showLoading();
    Hit.respond($scope.hit.id, $scope.radioData.choiceId, $scope.hit.context_data_types)
      .then(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "You have successfully responded to this HIT!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });
        getHit();               
      },function (error) {
        hideLoading();
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Errors were encountered while responding to this HIT!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });        
      });
  }
  
})