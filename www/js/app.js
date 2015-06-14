angular.module('cp-vendor-app', [
  'ionic',
  'cp-vendor-app.controllers',
  'cp-vendor-app.services',
  'cp-vendor-app.constants',
  'cpLib',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider

  .state('redirectToHomepage', {
    url: '/redirect-to-homepage',
    controller: function(SecurityService, $state) {
      if (!SecurityService.isLoggedIn()) {
        $state.go('login');
      } else if (SecurityService.isVendor()) {
        $state.go('tab.orders');
      } else {
        throw new Error('Unable to redirect the user.');
      }
    }
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  .state('login', {
    url:'/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

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

  .state('tab.reviews', {
    url: '/reviews',
    views: {
      'tab-reviews': {
        templateUrl: 'templates/tab-reviews.html',
        controller: 'ReviewsCtrl'
      }
    }
  })

  .state('tab.review-detail', {
    url: '/reviews/:reviewId',
    views: {
      'tab-reviews': {
        templateUrl: 'templates/review-detail.html',
        controller: 'ReviewDetailCtrl'
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

  $urlRouterProvider.otherwise('/redirect-to-homepage');
})
.run(function($rootScope, UsersFactory, $window) {
  var isLoggedIn = JSON.parse(localStorage.getItem('apiAuth'));
  if (isLoggedIn) {
    UsersFactory.getLoggedInUser().catch(function(response) {
      if (response.status === 401) {
        // The user's ID or auth token is no longer valid. This is possibly because this is
        // a dev or staging site and the database fixtures have been reloaded.
        $rootScope.isLoggedIn = false;
        localStorage.removeItem('apiAuth');
        localStorage.removeItem('user');
        $window.location.href = '/#/login';
      }
    });
  }
});
