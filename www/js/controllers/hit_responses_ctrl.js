controllersModule.controller('HitResponsesController', function($scope, $ionicPopup, $stateParams, Hit) {
  $scope.init = function () {
    $scope.hitResponses = [];
    $scope.dataToLoad = true;
    $scope.currentPage = 0;
    $scope.taskId = $stateParams.id;
  }

  $scope.getNextPage = function () {
    Hit.getAllResponses($stateParams.id, $scope.currentPage + 1).success(function (data) {
      if (data.length != 0) {
        $scope.currentPage += 1;
        $scope.hitResponses = $scope.hitResponses.concat(data);
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