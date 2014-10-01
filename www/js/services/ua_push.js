servicesModule.service('PushService', function ($q) {


  var handleIncomingPush = function(incoming) {
    if(incoming.message) {
      alert("Incoming push: " + incoming.message);
    }
    if (incoming.extras.url) {
      showPage(incoming.extras.url);
    }
  }

  // // Registration callback
  // var onRegistration = function(event)  {
  //   if (!event.error) {
  //     alert("Reg Success: " + event.pushID);
  //   } else {
  //     alert(event.error);
  //   }
  // }

  this.getPushId = function () {
    var deferred = $q.defer();
    PushNotification.getPushID(function(pushId) {
      deferred.resolve(pushId);
    });
    return deferred.promise;
  }

  this.initializePush = function () {
  //   document.addEventListener("urbanairship.registration", onRegistration, false)
    document.addEventListener("urbanairship.push", handleIncomingPush, false)
  }

})