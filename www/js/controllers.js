angular.module('starter.controllers', [])

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

.controller('OrdersCtrl', function($scope, SecurityService, ApiFactory,
    ModalService, LoadingService, watchForControllerRefresh) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('OrdersCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    ApiFactory.getOrdersByCurrentVendor().success(function(response) {
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

      LoadingService.hide();
    }).catch(function() {
      ModalService.infoModal('There has been an error, please try again.');
      LoadingService.hide();
    });
  }
})

.controller('OrderDetailCtrl', function($scope, $stateParams, ModalService, SecurityService,
    LoadingService, ApiFactory, watchForControllerRefresh) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('OrderDetailCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    ApiFactory.getOrder($stateParams.orderId).success(function(response) {
      $scope.order = response;
      $scope.accepted = response.status === 2;

      LoadingService.hide();
    }).catch(function() {
      ModalService.infoModal('There has been an error, please try again.');
      LoadingService.hide();
    });
  }

  $scope.acceptOrder = function() {
    ApiFactory.acceptOrder($stateParams.orderId).success(function() {
      $scope.accepted = true;
    }).catch(function() {
      ModalService.infoModal("There has been an error, please try again.");
    });
  };
})

.controller('UpcomingOrderCtrl', function($scope, $state, $stateParams, ModalService,
    LoadingService, SecurityService, ApiFactory, watchForControllerRefresh) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('UpcomingOrderCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    $scope.showDeliveredButton = true;
    $scope.showLeftKitchenButton = true;
    $scope.showLate15Button = true;
    $scope.showLateOver15Button = true;

    ApiFactory.getOrder($stateParams.orderId).success(function(response) {
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
        default:
        break;
      }

      LoadingService.hide();
    }).catch(function() {
      ModalService.infoModal('There has been an error, please try again.');
      LoadingService.hide();
    });
  }

  $scope.markAsFinished = function() {
    ApiFactory.setDeliveryStatus($stateParams.orderId, 4).success(function () {
      $scope.showDeliveredButton = false;
      $scope.showLateOver15Button = false;
      $scope.showLate15Button = false;
      $scope.showLeftKitchenButton = false;
      ModalService.infoModal('Order marked as finished.', 'Information');
    }).catch(function(response) {
      ModalService.infoModal(response.data.errorTranslation);
    });
  };

  $scope.markAsLeftKitchen = function() {
    ApiFactory.setDeliveryStatus($stateParams.orderId, 1).success(function () {
      $scope.showLeftKitchenButton = false;
      ModalService.infoModal('Order marked as having left the kitchen.', 'Information');
    }).catch(function(response) {
      ModalService.infoModal(response.data.errorTranslation);
    });
  };

  $scope.markAsLate15Minutes = function() {
    ApiFactory.setDeliveryStatus($stateParams.orderId, 2).success(function () {
      $scope.showLate15Button = false;
      $scope.showLeftKitchenButton = false;
      ModalService.infoModal('Order marked as late by less than 15 minutes.', 'Information');
    }).catch(function(response) {
      ModalService.infoModal(response.data.errorTranslation);
    });
  };

  $scope.markAsLateOver15Minutes = function() {
    ApiFactory.setDeliveryStatus($stateParams.orderId, 3).success(function () {
      $scope.showLate15Button = false;
      $scope.showLeftKitchenButton = false;
      $scope.showLateOver15Button = false;
      ModalService.infoModal('Order marked as late by more than 15 minutes.', 'Information');
    }).catch(function(response) {
      ModalService.infoModal(response.data.errorTranslation);
    });
  };

  $scope.viewOrder = function() {
    $state.go('tab.order-detail', {'orderId': $stateParams.orderId});
  };
})

.controller('MessagesCtrl', function($scope, ModalService, SecurityService,
    LoadingService, watchForControllerRefresh, ApiFactory) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('MessagesCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    ApiFactory.getOrdersWithMessages().success(function(response) {
      $scope.ordersWithMessages = response;
      LoadingService.hide();
    }).catch(function(response) {
      ModalService.infoModal('There has been an error, please try again later.');
      LoadingService.hide();
    });
  }

})

.controller('MessageDetailCtrl', function($scope, $stateParams, $ionicPopup, ModalService, SecurityService,
    LoadingService, watchForControllerRefresh, ApiFactory) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('MessageDetailCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    ApiFactory.getOrderMessages($stateParams.orderId).success(function(response) {
      $scope.orderMessages = response;

      LoadingService.hide();
    }).catch(function(response) {
      ModalService.infoModal('There has been an error, please try again later.');
      LoadingService.hide();
    });
  }

  $scope.showMessageBox = function() {
    ModalService.messageModal($stateParams.orderId, refreshView);
  };
})

.controller('LoginCtrl', function($scope, $rootScope, $location, ApiFactory, ModalService, SecurityService) {
  SecurityService.requireLoggedOut();
  $scope.details = {};
  $scope.login = function() {
      ApiFactory.logIn($scope.details.email, $scope.details.password).success(function(response) {
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
          ModalService.infoModal('Vendors only.');
        }

      }).catch(function(response) {
        $scope.details = {};
        ModalService.infoModal(response.data.errorTranslation);
      });
  };
})

.controller('AccountCtrl', function($scope, $rootScope, $ionicPopup, $location, ApiFactory,
    ModalService, LoadingService, SecurityService, watchForControllerRefresh) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('OrdersCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    $rootScope.vendor = {};

    ApiFactory.getAuthenticatedUser().success(function(response) {
      $rootScope.vendor = response.vendor;
      LoadingService.hide();
    }).catch(function() {
      ModalService.infoModal('There has been an error.');
      LoadingService.hide();
      $scope.logOut();
    });
  }

  $scope.showEditBox = function(title, vendorKeyName, canBeEmpty, isNumeric) {
    ModalService.editModal(title, vendorKeyName, canBeEmpty, isNumeric);
  };

  $scope.logOut = function() {
    $rootScope.isLoggedIn = false;
    localStorage.removeItem('apiAuth');
    localStorage.removeItem('user');
    $location.path('/login');
  };
});
