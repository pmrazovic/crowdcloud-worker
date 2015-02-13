// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('mobics', ['ionic', 'mobics.services', 'mobics.controllers', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $cordovaToast, $timeout, $window, RegistrationService, PushService, BackgroundLocationService, ConfigurationService) {

  $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    }
    else if ($rootScope.$viewHistory.backView) {
      $rootScope.$viewHistory.backView.go();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      $cordovaToast.showShortBottom('Press back button again to exit!').then(function(success) {}, function (error) {});
      $timeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },2000);
    }
    e.preventDefault();
    return false;
  },101);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // update registration in GMC
    PushService.getDeviceId();

    if ((ConfigurationService.get("background_tracking") !== "false") && (typeof ConfigurationService.get("reg_id") !== "undefined")) {
      BackgroundLocationService.startTracking();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppController'
    })
    .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html",
          controller: 'DashboardController'
        }
      }
    })
    .state('app.subscriptions', {
      url: "/subscriptions",
      views: {
        'menuContent' :{
          templateUrl: "templates/subscriptions.html",
        }
      }
    })
    .state('app.sensing_tasks', {
      url: "/sensing_tasks",
      views: {
        'menuContent' :{
          templateUrl: "templates/sensing_tasks.html",
          controller: 'SensingTasksController'
        }
      }
    })
    .state('app.sensing_task', {
      url: "/sensing_tasks/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/sensing_task.html",
          controller: 'SensingTaskController'
        }
      }
    })
    .state('app.sensing_task_responses', {
      url: "/sensing_tasks/:id/responses",
      views: {
        'menuContent' :{
          templateUrl: "templates/sensing_task_responses.html",
          controller: 'SensingTaskResponsesController'
        }
      }
    })
    .state('app.sensing_task_response', {
      url: "/sensing_tasks/:task_id/responses/:response_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/sensing_task_response.html",
          controller: 'SensingTaskResponseController'
        }
      }
    })
    .state('app.new_sensing_task', {
      url: "/new_sensing_tasks",
      views: {
        'menuContent' :{
          templateUrl: "templates/new_sensing_task.html",
          controller: 'NewSensingTaskController'
        }
      }
    })
    .state('app.hits', {
      url: "/hits",
      views: {
        'menuContent' :{
          templateUrl: "templates/hits.html",
          controller: 'HitsController'
        }
      }
    })
    .state('app.hit', {
      url: "/hits/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/hit.html",
          controller: 'HitController'
        }
      }
    })
    .state('app.hit_responses', {
      url: "/hits/:id/responses",
      views: {
        'menuContent' :{
          templateUrl: "templates/hit_responses.html",
          controller: 'HitResponsesController'
        }
      }
    })
    .state('app.hit_response', {
      url: "/hits/:task_id/responses/:response_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/hit_response.html",
          controller: 'HitResponseController'
        }
      }
    })
    .state('app.hit_reply', {
      url: "/hits/:id/reply",
      views: {
        'menuContent' :{
          templateUrl: "templates/hit_reply.html",
          controller: 'HitReplyController'
        }
      }
    })
    .state('app.privacy_control', {
      url: "/privacy_control",
      views: {
        'menuContent' :{
          templateUrl: "templates/privacy_control.html"
        }
      }
    })
    .state('app.social_networks', {
      url: "/social_networks",
      views: {
        'menuContent' :{
          templateUrl: "templates/social_networks.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});

var servicesModule = angular.module("mobics.services", []);
var controllersModule = angular.module("mobics.controllers", []);