angular.module('starter.controllers', ['starter.constants'])

.controller('TabsCtrl', function($scope, $state) {
  $scope.navigateState = function(state) {
    $state.go(state);
  };
})

.controller('OrdersCtrl', function($scope, $rootScope, $http, SecurityService, API_BASE) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };
  $scope.unconfirmedOrders = [];
  $scope.upcomingOrders = [];

  $http.get(API_BASE + '/orders/by-current-vendor', {headers: headers})
      .success(function(response) {
    var threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    threeDaysFromNow.setHours(23, 59, 59);

    for (var i = 0; i < response.orders.length; i++) {
      var deliveryDate = new Date(response.orders[i].requestedDeliveryDate);

      if (response.orders[i].status === 1) {
        $scope.unconfirmedOrders.push(response.orders[i]);
      }

      if (response.orders[i].status === 2 && deliveryDate < threeDaysFromNow) {
        $scope.upcomingOrders.push(response.orders[i]);
      }
    }
  }).catch(function() {
    // @todo - Make a modal. #mkmdl
    alert("There has been an error, please try again.");
  });
})

.controller('OrderDetailCtrl', function($scope, $http, $stateParams, SecurityService, API_BASE) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  $http.get(API_BASE + '/orders/' + $stateParams.orderId, {headers: headers})
      .success(function(response) {
    $scope.order = response;
    $scope.accepted = response.status === 2;
  }).catch(function() {
    // @todo - Make a modal. #mkmdl
    alert("There has been an error, please try again.");
  });

  $scope.acceptOrder = function() {
    $http.put(API_BASE + '/order/' + $stateParams.orderId + '/accept', {}, {headers: headers})
        .success(function() {
      $scope.accepted = true;
    }).catch(function() {
      // @todo - Make a modal. #mkmdl
      alert("There has been an error, please try again.");
    });
  };
})

.controller('UpcomingOrderCtrl', function($http, $scope, $state, $stateParams, SecurityService, API_BASE) {
  SecurityService.requireVendor();
  $scope.showDeliveredButton = true;
  $scope.showLeftKitchenButton = true;
  $scope.showLate15Button = true;
  $scope.showLateOver15Button = true;
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  $http.get(API_BASE + '/orders/' + $stateParams.orderId, {headers: headers})
    .success(function(response) {
    switch (response.deliveryStatus) {
      case 4:
        $scope.showDeliveredButton = false;
      case 3:
        $scope.showLateOver15Button = false;
      case 2:
        $scope.showLate15Button = false;
      case 1:
        $scope.showLeftKitchenButton = false;
      break;
    }
  }).catch(function() {
    // @todo - Make a modal. #mkmdl
    alert("There has been an error, please try again.");
  });

  $scope.markAsFinished = function() {};
  $scope.markAsLeftKitchen = function() {};
  $scope.markAsLate15Minutes = function() {};
  $scope.markAsLateOver15Minutes = function() {};
  $scope.viewOrder = function() {
    $state.go('tab.order-detail', {'orderId': $stateParams.orderId});
  };
})

.controller('MessagesCtrl', function($scope, SecurityService) {
  SecurityService.requireVendor();
})

.controller('MessageDetailCtrl', function($scope, SecurityService) {
  SecurityService.requireVendor();
})

.controller('LoginCtrl', function($scope, $rootScope, $http, $location, SecurityService, API_BASE) {
  SecurityService.requireLoggedOut();
  $scope.details = {};
  console.log($rootScope.isLoggedIn);
  $scope.login = function() {
      var postData = {email: $scope.details.email, plainPassword: $scope.details.password};
      $http.post(API_BASE + '/user/login', postData).success(function(response) {
        $rootScope.isLoggedIn = true;
        localStorage.setItem('apiAuth', JSON.stringify(response.apiAuth));
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log($rootScope.isLoggedIn);
        if (SecurityService.inGroup(['admin', 'user'])) {
          $location.path('/');
        } else {
          $rootScope.isLoggedIn = false;
          localStorage.removeItem('apiAuth');
          localStorage.removeItem('user');
          $scope.details = {};
          // @todo - Make a modal. #mkmdl
          alert('Vendor only');
        }

      }).catch(function(response) {
        $scope.details = {};
        // @todo - Make a modal. #mkmdl
        alert(response.data.errorTranslation);
      });
  };
})

.controller('AccountCtrl', function($scope, $rootScope, $location, SecurityService) {
  SecurityService.requireVendor();

  $scope.logOut = function() {
    $rootScope.isLoggedIn = false;
    localStorage.removeItem('apiAuth');
    localStorage.removeItem('user');
    $location.path('/login');
  };

  $scope.settings = {
    enableFriends: true
  };
});
