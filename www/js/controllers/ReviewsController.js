angular.module('cp-vendor-app.controllers')

.controller('ReviewsCtrl', function($scope, SecurityService, LoadingService,
    ModalService, ApiFactory, watchForControllerRefresh) {
  SecurityService.requireVendor();

  refreshView();

  watchForControllerRefresh('ReviewsCtrl', refreshView);

  function refreshView() {
    LoadingService.show();
    $scope.counter = 0;

    ApiFactory.getRecentReviews().success(function(response) {
      $scope.orderReviews = response;
      LoadingService.hide();
    }).catch(function(response) {
      ModalService.infoModal('There has been an error, please try again later.');
      LoadingService.hide();
    });
  }

});
