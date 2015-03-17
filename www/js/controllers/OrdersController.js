angular.module('cp-vendor-app.controllers')

.controller('OrdersCtrl', function($scope, SecurityService, ApiFactory,
    ModalService, LoadingService, watchForControllerRefresh) {
  SecurityService.requireVendor();

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

  refreshView();

  watchForControllerRefresh('OrdersCtrl', refreshView);
});
