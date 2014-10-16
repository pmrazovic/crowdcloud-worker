controllersModule.controller('OpenCallsController', function($scope, $ionicLoading, $ionicPopup, OpenCall) {
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-b"></i> Loading...'
    });
  };

  var hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.open_calls = [];
  $scope.init = function () {
    $scope.getPage(1);
  }

  $scope.getPage = function (page) {
    showLoading();
    OpenCall.getAll(page).success(function (data) {
      hideLoading();
      $scope.open_calls = $scope.open_calls.concat(data);
    })
    .error(function (error) {
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: "Errors were encountered while loading open calls!",
        buttons: [ { text: 'Ok', type: 'button-dark' } ]
      });
    })
  }

})