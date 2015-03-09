angular.module('cp-vendor-app.controllers')

.controller('LoginCtrl', function($scope, $rootScope, $location, ApiFactory, ModalService, SecurityService) {
  SecurityService.requireLoggedOut();
  $scope.details = {};
  $scope.login = function() {
      ApiFactory.logIn($scope.details.email, $scope.details.password).success(function(response) {
        $rootScope.isLoggedIn = true;
        localStorage.setItem('apiAuth', JSON.stringify(response.apiAuth));
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log($rootScope.isLoggedIn);
        if (SecurityService.inGroup(['admin', 'user'])) {
          $location.path('/');
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