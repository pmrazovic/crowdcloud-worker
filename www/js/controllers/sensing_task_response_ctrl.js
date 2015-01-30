controllersModule.controller('SensingTaskResponseController', function($scope, $ionicLoading, $ionicPopup, $stateParams, SensingTask) {
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
    getSensingTaskResponse();
  }

  var getSensingTaskResponse = function () {
    SensingTask.getResponse($stateParams.task_id, $stateParams.response_id).success(function (data) {
      hideLoading();
      $scope.sensingTaskResponse = data;
    })
    .error(function (error) {
      hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: "Errors were encountered while loading sensing task!",
        buttons: [ { text: 'Ok', type: 'button-dark' } ]
      });
    })
  }




})