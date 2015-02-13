//http://forum.ionicframework.com/t/how-to-show-a-modal-while-receive-notifications/3294/12
servicesModule.service('PushService', function ($q, $rootScope, $http, $ionicPlatform, $ionicPopup, $cordovaPush, $cordovaDialogs, $cordovaDevice, RegistrationService, SensingResponseService, ConfigurationService) {

  var deferred;
  
  //trigger once device id is received
  $rootScope.$on('device_id_received', function(event, args) {
    if(deferred){
      deferred.resolve({"deviceId" : args.data});
    }
  });
  
  //Get deviceId for push notifications - handled for both IOS and Android
    this.getDeviceId = function(){
    deferred = $q.defer();
    try{
      var androidConfig = {
          "senderID":"1015862923184",//replace with actual deviceId. Otherwise onNotification will not be triggered
          "ecb":"onNotification"
        };
        
        var iosConfig = {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"onNotification"
        };
        var config = $ionicPlatform.is("android") ? androidConfig : iosConfig;
      
        $cordovaPush.register(config).then(function(result) {
          if((result) !== "OK"){
            $rootScope.$broadcast('device_id_received', {data : result});
          }
        }, function(err) {
          $rootScope.$broadcast('device_id_received', {data : null});
        });
      }catch(err){
        console.log(err);
        $rootScope.$broadcast('device_id_received', {data : null});
      }
      return deferred.promise;
  };
    this.onNotification = function (event) {
      $ionicPlatform.is("android") ? this.onNotificationGCM(event) : this.onNotificationAPN(event); 
    };
    this.onNotificationGCM = function (e) {
        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
              if (typeof ConfigurationService.get("reg_id") == 'undefined') {
                RegistrationService.registerDevice(e.regid);
              }
              $rootScope.$broadcast('device_id_received', {data : e.regid});
            }
        break;

        case 'message':
          if (e.foreground) {
            if (typeof e.payload.task != 'undefined') {
              var taskType = e.payload.task.type;   
              var confirmPopup = $ionicPopup.confirm({
                title: 'New task received',
                template: 'Do you want to respond right now?',
                buttons: [ { text: 'No', type: 'button-stable', onTap: function () { return false } },
                           { text: 'Yes', type: 'button-dark', onTap: function () { return true } } ]
              });
              confirmPopup.then(function(res) {
                if(res) {
                  if (taskType === 'SensingTask') {
                    window.location = "#/app/sensing_tasks/" + e.payload.task.id.toString();
                  } else if (taskType === 'Hit') {
                    window.location = "#/app/hits/" + e.payload.task.id.toString();
                  }
                }
              });

              // SensingResponseService.readSensorData(e.payload.open_call.response_data_types).then(function (data) {
              //   var url = "http://130.229.148.98:3000/open_calls/" + e.payload.open_call.id.toString() + "/responses";
              //   $http.post(url, data, {headers: {'Accept' : 'application/json; charset=UTF-8'}});
              // });

            }
          } else {
            if (typeof e.payload.task != 'undefined') {
              var taskType = e.payload.task.type;
              if (taskType === 'SensingTask') {
                window.location = "#/app/sensing_tasks/" + e.payload.task.id.toString();
              } else if (taskType === 'Hit') {
                window.location = "#/app/hits/" + e.payload.task.id.toString();
              }
            }            
          }              
        break;

        case 'error':
            
        break;

        default:
            
        break;
      }

    };
    this.onNotificationAPN = function (event) {
      try{
        if (event.badge) {
              $cordovaPush.setBadgeNumber(event.badge);
          }
        if (eval(event.foreground)) {
            if (event.alert){
                alert(event.alert).then(function(){
                  $rootScope.$broadcast('show_notification', {data : event});
                });
            }
    
            if (event.sound){
                $cordovaDialogs.beep(1);
            }
        }else{
          $rootScope.$broadcast('show_notification', {data : event});
        }
      }catch(err){
        console.log(err);
      }
    };
});

function onNotification(event) {
    var injector = angular.element(document.body).injector();
    injector.invoke(function (PushService) {
        PushService.onNotification(event);
    });
}