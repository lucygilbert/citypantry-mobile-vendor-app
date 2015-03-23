angular.module('cp-vendor-app.controllers')

.controller('ReviewDetailCtrl', function($scope, $stateParams, SecurityService, LoadingService,
    ModalService, ApiFactory, watchForControllerRefresh) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('ReviewDetailCtrl', refreshView);

  function refreshView() {
    LoadingService.show();

    ApiFactory.getRecentReviews().success(function(response) {
      $scope.review = response.reviewsAndOrders.filter(function(review) {
        return review.order.id == $stateParams.orderId;
      });
      console.log($scope.review);
      LoadingService.hide();
    }).catch(function(response) {
      ModalService.infoModal('There has been an error, please try again later.');
      LoadingService.hide();
    });
  }

});
