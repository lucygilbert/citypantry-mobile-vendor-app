angular.module('cp-vendor-app.controllers')

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
});
