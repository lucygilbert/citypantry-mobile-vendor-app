angular.module('cp-vendor-app.controllers')

.controller('ReviewDetailCtrl', function($scope, $stateParams, SecurityService, LoadingService,
    ModalService, ApiFactory) {
  SecurityService.requireVendor();

  LoadingService.show();

  ApiFactory.getRecentReviews().success(function(response) {
    $scope.review = response.reviewsAndOrders.filter(function(review) {
      return review.order.id === $stateParams.orderId;
    })[0];
    LoadingService.hide();
  }).catch(function(response) {
    ModalService.infoModal('There has been an error, please try again later.');
    LoadingService.hide();
  });
});
