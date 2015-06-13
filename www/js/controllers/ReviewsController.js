angular.module('cp-vendor-app.controllers')

.controller('ReviewsCtrl', function($scope, SecurityService, LoadingService,
    ModalService, ReviewFactory) {
  SecurityService.requireVendor();

  LoadingService.show();

  ReviewFactory.getRecentReviews().success(function(response) {
    $scope.orderReviews = response.reviewsAndOrders
      .filter(function(reviewAndOrder) {
        return !!reviewAndOrder.review.review;
      })
      .sort(function(a, b) {
        var aDate = new Date(a.review.date);
        var bDate = new Date(b.review.date);
        return aDate - bDate;
      });

    LoadingService.hide();
  }).catch(function(response) {
    ModalService.infoModal('There has been an error, please try again later.');
    LoadingService.hide();
  });
});
