controllersModule.controller('SensingTaskController', function($scope, $ionicLoading, $ionicPopup, $stateParams, SensingTask) {
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
    getSensingTask();
  }

  $scope.respond = function () {
    showLoading();
    SensingTask.respond($scope.sensing_task.id, $scope.sensing_task.response_data_types)
      .then(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "You have successfully responded to this sensing task!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });
        getSensingTask();               
      },function (error) {
        hideLoading();
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Errors were encountered while responding to this sensing task!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });        
      });
  }

  var getSensingTask = function () {
    SensingTask.get($stateParams.id).success(function (data) {
      hideLoading();
      $scope.sensing_task = data;
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