angular.module('cp-vendor-app.controllers')

.controller('NavBarCtrl', function($scope, $rootScope, $ionicHistory) {
  $scope.navigateBack = function() {
    $ionicHistory.goBack();
  };
});