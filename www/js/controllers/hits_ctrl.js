controllersModule.controller('HitsController', function($scope, $ionicLoading, $ionicPopup, $stateParams, Hit) {
  $scope.init = function () {
    $scope.hits = [];
    $scope.dataToLoad = true;
    $scope.currentPage = 0;
  }

  $scope.getNextPage = function () {
    Hit.getAll($scope.currentPage + 1).success(function (data) {
      if (data.length != 0) {
        $scope.currentPage += 1;
        $scope.hits = $scope.hits.concat(data);
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