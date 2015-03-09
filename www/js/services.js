angular.module('starter.services', [])

.service('watchForControllerRefresh', function($rootScope) {
  return function(controllerName, callback) {
    $rootScope.$on('refresh' + controllerName, callback);
  };
})

.service('AlertService', function($ionicPopup) {
  return {
    infoAlert: function(message, title) {
      title = title || 'Error';
      var errorPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    }
  };
})

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
})

.service('SecurityService', function($location) {
    return {
        getUser: function() {
            return (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : false;
        },

        inGroup: function(groups) {
            var user = this.getUser();
            if (!user || !user.group.name) {
                return false;
            }

            var result = false;
            var userGroup = user.group.name;

            if (groups.constructor === Array) {
                groups.forEach(function(group) {
                    if (group.toLowerCase() === userGroup.toLowerCase()) {
                        result = true;
                        return false;
                    }
                });
            } else {
                result = (groups.toLowerCase() === userGroup.toLowerCase());
            }

            return result;
        },

        isLoggedIn: function() {
            return !!localStorage.user;
        },

        requireLoggedIn: function() {
            if (!this.isLoggedIn()) {
                $location.path('/login');
            }
        },

        requireLoggedOut: function() {
            if (this.isLoggedIn()) {
                $location.path('/');
            }
        },

        requireVendor: function() {
            if (!this.isLoggedIn() || !this.inGroup(['admin', 'user'])) {
                $location.path('/login');
            }
        }
    };
});
