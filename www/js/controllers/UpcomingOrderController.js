angular.module('cp-vendor-app.controllers')

.controller('UpcomingOrderCtrl', function($scope, $state, $stateParams, ModalService,
    LoadingService, SecurityService, ApiFactory, watchForControllerRefresh) {
  SecurityService.requireVendor();

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
          $scope.showLateOver15Button = false;
          $scope.showLate15Button = false;
          $scope.showLeftKitchenButton = false;
          break;
        case 3:
          $scope.showLateOver15Button = false;
          $scope.showLate15Button = false;
          $scope.showLeftKitchenButton = false;
          break;
        case 2:
          $scope.showLate15Button = false;
          $scope.showLeftKitchenButton = false;
          break;
        case 1:
          $scope.showLeftKitchenButton = false;
          break;
      }

      LoadingService.hide();
    }).catch(function() {
      ModalService.infoModal('There has been an error, please try again.');
      LoadingService.hide();
    });
  }

  refreshView();

  watchForControllerRefresh('UpcomingOrderCtrl', refreshView);

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
});
