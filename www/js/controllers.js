angular.module('starter.controllers', ['starter.constants'])

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
    var upcomingDate = new Date();
    var deliveryDate = new Date();
    upcomingDate.setDate(upcomingDate.getDate() - 3);
    upcomingDate.setHours(0, 0, 0);
    for (var i = 0; i < response.orders.length; i++) {
      deliveryDate.setTime(Date.parse(response.orders[i].requestedDeliveryDate));
      if (response.orders[i].status == 1) {
        $scope.unconfirmedOrders.push(response.orders[i]);
      }
      if (response.orders[i].status == 2 && deliveryDate.toDateString() >= upcomingDate.toDateString()) {
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
  }).catch(function() {
    // @todo - Make a modal. #mkmdl
    alert("There has been an error, please try again.");
  });
})

.controller('UpcomingOrderCtrl', function($http, $scope, $stateParams, SecurityService, API_BASE) {
  SecurityService.requireVendor();
  $scope.finished = true;
  $scope.leftKitchen = true;
  $scope.late15 = true;
  $scope.lateOver15 = true;
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  $http.get(API_BASE + '/orders/' + $stateParams.orderId, {headers: headers})
    .success(function(response) {
    switch (response.deliveryStatus) {
      case 4:
        $scope.finished = false;
      case 3:
        $scope.lateOver15 = false;
      case 2:
        $scope.late15 = false;
      case 1:
        $scope.leftKitchen = false;
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
  $scope.callCityPantry = function() {};
  $scope.viewOrder = function() {};
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
