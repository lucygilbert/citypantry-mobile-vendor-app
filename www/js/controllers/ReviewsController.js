angular.module('cp-vendor-app.controllers')

.controller('ReviewsCtrl', function($scope, SecurityService, LoadingService,
    ModalService, ApiFactory) {
  SecurityService.requireVendor();

  LoadingService.show();

  ApiFactory.getRecentReviews().success(function(response) {
    response.reviewsAndOrders.sort(function(a,b) {
      var aDate = new Date(a.review.date);
      var bDate = new Date(b.review.date);
      return aDate - bDate;
    });
    $scope.orderReviews = response.reviewsAndOrders;
    LoadingService.hide();
  }).catch(function(response) {
    ModalService.infoModal('There has been an error, please try again later.');
    LoadingService.hide();
  });
});
