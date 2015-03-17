angular.module('cp-vendor-app.controllers', [])

.controller('AccountCtrl', function($scope, $rootScope, $ionicPopup, $state, ApiFactory,
    ModalService, LoadingService, SecurityService, watchForControllerRefresh) {
  SecurityService.requireVendor();

  function refreshView() {
    LoadingService.show();

    $rootScope.vendor = {};

    ApiFactory.getAuthenticatedUser().success(function(response) {
      $rootScope.vendor = response.vendor;
      LoadingService.hide();
    }).catch(function() {
      ModalService.infoModal('There has been an error.');
      LoadingService.hide();
      $scope.logOut();
    });
  }

  refreshView();

  watchForControllerRefresh('OrdersCtrl', refreshView);

  $scope.showEditBox = function(title, vendorKeyName, canBeEmpty, isNumeric) {
    ModalService.editModal(title, vendorKeyName, canBeEmpty, isNumeric);
  };

  $scope.logOut = function() {
    $rootScope.isLoggedIn = false;
    localStorage.removeItem('apiAuth');
    localStorage.removeItem('user');
    $state.go('login');
  };
});
