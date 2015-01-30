controllersModule.controller('SensingTaskResponsesController', function($scope, $ionicPopup, $stateParams, SensingTask) {
  $scope.init = function () {
    $scope.sensingTaskResponses = [];
    $scope.dataToLoad = true;
    $scope.currentPage = 0;
    $scope.taskId = $stateParams.id;
  }

  $scope.getNextPage = function () {
    SensingTask.getAllResponses($stateParams.id, $scope.currentPage + 1).success(function (data) {
      if (data.length != 0) {
        $scope.currentPage += 1;
        $scope.sensingTaskResponses = $scope.sensingTaskResponses.concat(data);
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
        template: "Errors were encountered while loading responses!",
        buttons: [ { text: 'Ok', type: 'button-dark' } ]
      });
    })
  }

})