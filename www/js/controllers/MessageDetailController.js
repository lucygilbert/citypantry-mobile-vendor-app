angular.module('cp-vendor-app.controllers')

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
});