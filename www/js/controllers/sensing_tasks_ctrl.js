controllersModule.controller('SensingTasksController', function($scope, $ionicLoading, $ionicPopup, $state, SensingTask) {
  $scope.init = function () {
    $scope.sensingTasks = [];
    $scope.dataToLoad = true;
    $scope.currentPage = 0;
  }

  $scope.new = function() {
    $state.go('app.new_sensing_task');
  };

  $scope.getNextPage = function () {
    SensingTask.getAll($scope.currentPage + 1).success(function (data) {
      if (data.length != 0) {
        $scope.currentPage += 1;
        $scope.sensingTasks = $scope.sensingTasks.concat(data);
        if (data.length < 20) {
          $scope.dataToLoad = false;
        }
      } else {
        $scope.dataToLoad = false;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })
    .error(function (error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: "Errors were encountered while loading open calls!",
        buttons: [ { text: 'Ok', type: 'button-dark' } ]
      });
    })
  }

})