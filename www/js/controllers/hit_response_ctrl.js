controllersModule.controller('HitResponseController', function($scope, $ionicLoading, $ionicPopup, $stateParams, Hit) {
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
    getHitResponse();
  }

  var getHitResponse = function () {
    Hit.getResponse($stateParams.task_id, $stateParams.response_id).success(function (data) {
      hideLoading();
      $scope.hitResponse = data;
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

  $scope.initMap = function (lat, lng, accuracy) {
    $scope.map = L.map('map');
    var latLng = new L.LatLng(lat, lng)
    var radius = accuracy / 2;

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
    }).addTo($scope.map);

    L.marker(latLng).addTo($scope.map)
      .bindPopup("Contributor's location").openPopup();
    
    L.circle(latLng, radius).addTo($scope.map);

    $scope.map.setView(latLng, 16);
  }

})