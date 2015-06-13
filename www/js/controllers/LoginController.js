angular.module('cp-vendor-app.controllers')

.controller('LoginCtrl', function($scope, $rootScope, $state, AuthenticationFactory, ModalService, SecurityService) {
  SecurityService.requireLoggedOut();
  $scope.details = {};
  $scope.login = function() {
      AuthenticationFactory.login({email:$scope.details.email, plainPassword:$scope.details.password})
      .success(function(response) {
        $rootScope.isLoggedIn = true;

        localStorage.setItem('apiAuth', JSON.stringify(response.apiAuth));
        localStorage.setItem('user', JSON.stringify(response.user));

        if (SecurityService.isVendor()) {
          $state.go('redirectToHomepage');
        } else {
          $rootScope.isLoggedIn = false;
          localStorage.removeItem('apiAuth');
          localStorage.removeItem('user');
          $scope.details = {};
          ModalService.infoModal('Vendors only.');
        }

      }).catch(function(response) {
        $scope.details = {};
        ModalService.infoModal(response.data.errorTranslation);
      });
  };
});
