angular.module('starter.controllers', ['starter.constants'])

.service('watchForControllerRefresh', function($rootScope) {
  return function(controllerName, callback) {
    $rootScope.$on('refresh' + controllerName, callback);
  };
})

.service('AlertService', function($ionicPopup) {
  return {
    infoAlert: function(message, title) {
      title = title || 'Error';
      var errorPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    }
  };
})

.controller('TabsCtrl', function($scope, $state) {
  $scope.navigateState = function(state) {
    $state.go(state);
  };
})

.controller('NavBarCtrl', function($scope, $rootScope, $ionicHistory) {
  $scope.navigateBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('OrdersCtrl', function($scope, $rootScope, $http, $ionicHistory, SecurityService, API_BASE,
    AlertService, watchForControllerRefresh) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  refreshView();

  watchForControllerRefresh('OrdersCtrl', refreshView);

  function refreshView() {

    $http.get(API_BASE + '/orders/by-current-vendor', {headers: headers})
        .success(function(response) {
      $scope.unconfirmedOrders = [];
      $scope.upcomingOrders = [];

      var threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
      threeDaysFromNow.setHours(23, 59, 59);

      var oneHourAgo = new Date();
      oneHourAgo.setTime(oneHourAgo.getTime() - (60 * 60 * 1000));

      for (var i = 0; i < response.orders.length; i++) {
        var deliveryDate = new Date(response.orders[i].requestedDeliveryDate);

        if (response.orders[i].status === 1) {
          $scope.unconfirmedOrders.push(response.orders[i]);
        }

        if (response.orders[i].status === 2 && deliveryDate < threeDaysFromNow && deliveryDate > oneHourAgo) {
          $scope.upcomingOrders.push(response.orders[i]);
        }
      }
    }).catch(function() {
      AlertService.infoAlert('There has been an error, please try again.');
    });
  }
})

.controller('OrderDetailCtrl', function($scope, $http, $stateParams, $ionicHistory, AlertService, SecurityService,
    API_BASE, watchForControllerRefresh) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  refreshView();

  watchForControllerRefresh('OrderDetailCtrl', refreshView);

  function refreshView() {

    $http.get(API_BASE + '/orders/' + $stateParams.orderId, {headers: headers})
        .success(function(response) {
      $scope.order = response;
      $scope.accepted = response.status === 2;
    }).catch(function() {
      AlertService.infoAlert('There has been an error, please try again.');
    });
  }

  $scope.acceptOrder = function() {
    $http.put(API_BASE + '/order/' + $stateParams.orderId + '/accept', {}, {headers: headers})
        .success(function() {
      $scope.accepted = true;
    }).catch(function() {
      AlertService.infoAlert("There has been an error, please try again.");
    });
  };
})

.controller('UpcomingOrderCtrl', function($http, $scope, $state, $stateParams, $ionicHistory, AlertService,
    SecurityService, API_BASE, watchForControllerRefresh) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  refreshView();

  watchForControllerRefresh('UpcomingOrderCtrl', refreshView);

  function refreshView() {
    $scope.showDeliveredButton = true;
    $scope.showLeftKitchenButton = true;
    $scope.showLate15Button = true;
    $scope.showLateOver15Button = true;

    $http.get(API_BASE + '/orders/' + $stateParams.orderId, {headers: headers})
      .success(function(response) {
      console.log(response.deliveryStatus);
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
      AlertService.infoAlert('There has been an error, please try again.');
    });
  }

  $scope.markAsFinished = function() {
    $http.put(API_BASE + '/order/' + $stateParams.orderId + '/delivery-status', {deliveryStatus: 4},
        {headers: headers}).success(function () {
      $scope.showDeliveredButton = false;
      $scope.showLateOver15Button = false;
      $scope.showLate15Button = false;
      $scope.showLeftKitchenButton = false;
      AlertService.infoAlert('Order marked as finished.', 'Information');
    }).catch(function(response) {
      AlertService.infoAlert(response.data.errorTranslation);
    });
  };

  $scope.markAsLeftKitchen = function() {
    $http.put(API_BASE + '/order/' + $stateParams.orderId + '/delivery-status', {deliveryStatus: 1},
        {headers: headers}).success(function () {
      $scope.showLeftKitchenButton = false;
      AlertService.infoAlert('Order marked as having left the kitchen.', 'Information');
    }).catch(function(response) {
      AlertService.infoAlert(response.data.errorTranslation);
    });
  };

  $scope.markAsLate15Minutes = function() {
    $http.put(API_BASE + '/order/' + $stateParams.orderId + '/delivery-status', {deliveryStatus: 2},
        {headers: headers}).success(function () {
      $scope.showLate15Button = false;
      $scope.showLeftKitchenButton = false;
      AlertService.infoAlert('Order marked as late by less than 15 minutes.', 'Information');
    }).catch(function(response) {
      AlertService.infoAlert(response.data.errorTranslation);
    });
  };

  $scope.markAsLateOver15Minutes = function() {
    $http.put(API_BASE + '/order/' + $stateParams.orderId + '/delivery-status', {deliveryStatus: 3},
        {headers: headers}).success(function () {
      $scope.showLate15Button = false;
      $scope.showLeftKitchenButton = false;
      $scope.showLateOver15Button = false;
      AlertService.infoAlert('Order marked as late by more than 15 minutes.', 'Information');
    }).catch(function(response) {
      AlertService.infoAlert(response.data.errorTranslation);
    });
  };

  $scope.viewOrder = function() {
    $state.go('tab.order-detail', {'orderId': $stateParams.orderId});
  };
})

.controller('MessagesCtrl', function($scope, $http, AlertService, SecurityService,
    watchForControllerRefresh, API_BASE) {
  SecurityService.requireVendor();

  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  refreshView();

  watchForControllerRefresh('MessagesCtrl', refreshView);

  function refreshView() {
    $http.get(API_BASE + '/orders/with-messages', {headers: headers}).success(function(response) {
      $scope.ordersWithMessages = response;
    }).catch(function(response) {
      AlertService.infoAlert('There has been an error, please try again later.');
    });
  }

})

.controller('MessageDetailCtrl', function($scope, $stateParams, $http, AlertService, SecurityService,
    API_BASE, watchForControllerRefresh) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  refreshView();

  watchForControllerRefresh('MessageDetailCtrl', refreshView);

  function refreshView() {
    $http.get(API_BASE + '/orders/' + $stateParams.orderId + '/messages', {headers: headers})
        .success(function(response) {
      $scope.orderMessages = response;
    }).catch(function(response) {
      AlertService.infoAlert('There has been an error, please try again later.');
    });
  }
})

.controller('LoginCtrl', function($scope, $rootScope, $http, $location, AlertService, SecurityService, API_BASE) {
  SecurityService.requireLoggedOut();
  $scope.details = {};
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
          AlertService.infoAlert('Vendors only.');
        }

      }).catch(function(response) {
        $scope.details = {};
        AlertService.infoAlert(response.data.errorTranslation);
      });
  };
})

.controller('AccountCtrl', function($scope, $rootScope, $ionicPopup, $ionicHistory, $http, $location,
    AlertService, SecurityService, API_BASE, watchForControllerRefresh) {
  SecurityService.requireVendor();
  var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
  var headers = {
      'X-CityPantry-UserId': apiAuth.userId,
      'X-CityPantry-AuthToken': apiAuth.salt,
  };

  refreshView();

  watchForControllerRefresh('OrdersCtrl', refreshView);

  function refreshView() {
    $scope.vendor = {};

    $http.get(API_BASE + '/users/get-authenticated-user', {headers: headers}).success(function(response) {
      $scope.vendor = response.vendor;
      console.log($scope.vendor);
    }).catch(function() {
      AlertService.infoAlert('There has been an error.');
      $scope.logOut();
    });
  }

  $scope.showEditBox = function(title, vendorKeyName, canBeEmpty, isNumeric) {
    canBeEmpty = canBeEmpty || false;
    isNumeric = isNumeric || false;

    var editBox = $ionicPopup.show({
      title: title,
      subTitle: canBeEmpty ? null : (isNumeric ? 'This field can only contain numbers' : 'This field cannot be empty'),
      template: '<input id="' + vendorKeyName + '" type="' + (isNumeric ? 'number' : 'text') + '" ' + (canBeEmpty ? '' : 'required') + ' ng-model="vendor.' + vendorKeyName + '" />',
      scope: $scope,
      buttons:[
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          type: 'button-positive',
          onTap: function(e) {
            if(!canBeEmpty && !$scope.vendor[vendorKeyName]) {
              e.preventDefault();
            } else {
              var updateInfo = {};
              updateInfo[vendorKeyName] = $scope.vendor[vendorKeyName];
              $http.put(API_BASE + '/vendors/me', updateInfo, {headers: headers}).success(function() {
                AlertService.infoAlert('Your information has been updated.', 'Information');
              }).catch(function() {
                AlertService.infoAlert('There has been an error, please try again.');
              });
            }
          }
        }
      ]
    });
  };

  $scope.logOut = function() {
    $rootScope.isLoggedIn = false;
    localStorage.removeItem('apiAuth');
    localStorage.removeItem('user');
    $location.path('/login');
  };
});
