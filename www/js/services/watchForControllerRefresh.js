angular.module('cp-vendor-app.services')

.service('watchForControllerRefresh', function($rootScope) {
  return function(controllerName, callback) {
    $rootScope.$on('refresh' + controllerName, callback);
  };
});
