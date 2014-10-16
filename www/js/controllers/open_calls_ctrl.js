controllersModule.controller('OpenCallsController', function($scope, $ionicLoading, $ionicPopup, OpenCall) {
  $scope.init = function () {
    $scope.openCalls = [];
    $scope.dataToLoad = true;
    $scope.currentPage = 0;
  }

  $scope.getNextPage = function () {
    OpenCall.getAll($scope.currentPage + 1).success(function (data) {
      if (data.length != 0) {
        $scope.currentPage += 1;
        $scope.openCalls = $scope.openCalls.concat(data);
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