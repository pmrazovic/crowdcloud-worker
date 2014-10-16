controllersModule.controller('OpenCallController', function($scope, $ionicLoading, $ionicPopup, $stateParams, OpenCall) {
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
    getOpenCall();
  }

  $scope.respond = function () {
    showLoading();
    OpenCall.respond($scope.open_call.id, $scope.open_call.response_data_types)
      .then(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "You have successfully responded to this open call!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });
        getOpenCall();               
      },function (error) {
        hideLoading();
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Errors were encountered while responding to this open call!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });        
      });
  }

  var getOpenCall = function () {
    OpenCall.get($stateParams.id).success(function (data) {
      hideLoading();
      $scope.open_call = data;
    })
    .error(function (error) {
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: "Errors were encountered while loading open call!",
        buttons: [ { text: 'Ok', type: 'button-dark' } ]
      });
    })
  }

})