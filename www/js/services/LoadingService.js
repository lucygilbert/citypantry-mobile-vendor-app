angular.module('cp-vendor-app.services', [])

.service('LoadingService', function($ionicLoading) {
  return {
    show: function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    },

    hide: function() {
      $ionicLoading.hide();
    }
  };
});
