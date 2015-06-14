angular.module('cp-vendor-app.controllers')

.controller('ReviewDetailCtrl', function($scope, $stateParams, SecurityService, LoadingService,
    ModalService, ReviewFactory, OrdersFactory) {
  SecurityService.requireVendor();

  LoadingService.show();

  ReviewFactory.getReview($stateParams.reviewId).success(function(response) {
    $scope.review = response.review;
    OrdersFactory.getOrder($scope.review.orderId).success(function(response) {
      $scope.order = response;
    }).catch(function(response) {
      ModalService.infoModal('There has been an error, please try again later.');
    });
    LoadingService.hide();
  }).catch(function(response) {
    ModalService.infoModal('There has been an error, please try again later.');
    LoadingService.hide();
  });
});
