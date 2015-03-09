angular.module('cp-vendor-app.controllers')

.controller('TabsCtrl', function($scope, $state) {
  $scope.navigateState = function(state) {
    $state.go(state);
  };
});
