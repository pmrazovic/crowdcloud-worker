controllersModule.controller('NewSensingTaskController', function($scope, $ionicLoading, $ionicPopup, $state, SensingTask) {
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
    SensingTask.fetch_sensing_data_types()
      .then(function (data) {
        hideLoading();
        $scope.sensingDataTypes = data.data;
      },function (error) {
        hideLoading();
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "MobiCS server is unavailable!",
          buttons: [ { text: 'Ok', type: 'button-dark' } ]
        });        
      });

    $scope.newTask = { crowdsourcer_id: window.localStorage["reg_id"],
                       crowdsourcer_type: 'Device',
                       name: '',
                       description: '',
                       sensing_data_type_ids: [] };

    $scope.toggleSelection = function toggleSelection(id) {
      var idx = $scope.newTask.sensing_data_type_ids.indexOf(id);

      // is currently selected
      if (idx > -1) {
        $scope.newTask.sensing_data_type_ids.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.newTask.sensing_data_type_ids.push(id);
      }
    };

  }

  $scope.taskValid = function () {
    return ($scope.newTask.name.length > 0) && 
           ($scope.newTask.description.length > 0) &&
           ($scope.newTask.sensing_data_type_ids.length > 0); 
  }

  $scope.publish = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'New task ready to publish',
      template: 'Are you sure you you want publish new sensing task?',
      buttons: [ { text: 'No', type: 'button-stable', onTap: function () { return false } },
                 { text: 'Yes', type: 'button-dark', onTap: function () { return true } } ]
    });
    confirmPopup.then(function(res) {
      if(res) {
        showLoading();
        SensingTask.publish($scope.newTask)
          .then(function (data) {
            hideLoading();
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: "You have successfully created and published new sensing task!",
              buttons: [ { text: 'Ok', type: 'button-dark' } ]
            });
            $state.go('app.sensing_tasks');             
          },function (error) {
            hideLoading();
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: "Errors were encountered while creating new sensing task! " + error.data.toString(),
              buttons: [ { text: 'Ok', type: 'button-dark' } ]
            });        
          });        
      }
    });
  }

})