// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabsCtrl'
  })

  .state('login', {
    url:'/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.orders', {
    url: '/orders',
    views: {
      'tab-orders': {
        templateUrl: 'templates/tab-orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  .state('tab.messages', {
    url: '/messages',
    views: {
      'tab-messages': {
        templateUrl: 'templates/tab-messages.html',
        controller: 'MessagesCtrl'
      }
    }
  })
  .state('tab.message-detail', {
    url: '/messages/:orderId',
    views: {
      'tab-messages': {
        templateUrl: 'templates/message-detail.html',
        controller: 'MessageDetailCtrl'
      }
    }
  })

  .state('tab.order-detail', {
    url: '/orders/:orderId',
    views: {
      'tab-orders': {
        templateUrl: 'templates/order-detail.html',
        controller: 'OrderDetailCtrl'
      }
    }
  })

  .state('tab.upcoming-order', {
    url: '/orders/upcoming/:orderId',
    views: {
      'tab-orders': {
        templateUrl: 'templates/order-upcoming.html',
        controller: 'UpcomingOrderCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/orders');

})

.run(function($rootScope) {
  $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams){
    if (toState.views) {
      var toController = toState.views[Object.keys(toState.views)[0]].controller;
      $rootScope.$broadcast('refresh' + toController);
    }
  });
});
