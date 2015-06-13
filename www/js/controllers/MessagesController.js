angular.module('cp-vendor-app.controllers')

.controller('MessagesCtrl', function($scope, ModalService, SecurityService,
    LoadingService, OrdersFactory) {
  SecurityService.requireVendor();

  LoadingService.show();

  OrdersFactory.getOrdersWithMessages().success(function(response) {
    $scope.ordersWithMessages = response;
    LoadingService.hide();
  }).catch(function(response) {
    ModalService.infoModal('There has been an error, please try again later.');
    LoadingService.hide();
  });
});
