angular.module('cp-vendor-app.services', [])

.service('watchForControllerRefresh', function($rootScope) {
  return function(controllerName, callback) {
    $rootScope.$on('refresh' + controllerName, callback);
  };
})

.service('ApiService', function($http) {
  function addAuthHeaders() {
    var apiAuth = JSON.parse(localStorage.getItem('apiAuth'));
    var config = { headers: null };
    if(apiAuth) {
      config.headers = {
        'X-CityPantry-UserId': apiAuth.userId,
        'X-CityPantry-AuthToken': apiAuth.salt,
      };
    }

    return config;
  }

  return {
    get: function(url) {
      config = addAuthHeaders();

      return $http.get(url, config);
    },

    post: function(url, data) {
      config = addAuthHeaders();

      return $http.post(url, data, config);
    },

    put: function(url, data) {
      config = addAuthHeaders();

      return $http.put(url, data, config);
    },

    'delete': function(url) {
      config = addAuthHeaders();

      return $http.delete(url, config);
    }
  };
})

.service('ModalService', function($ionicPopup, $rootScope, ApiFactory) {
  var service = {
    infoModal: function(message, title) {
      title = title || 'Error';
      var errorPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    },

    messageModal: function(orderId, callback) {
      $rootScope.addMessageText = {message: null};

      var editBox = $ionicPopup.show({
        title: 'Send message',
        template: '<textarea required ng-model="addMessageText.message"></textarea>',
        scope: $rootScope,
        buttons:[
          {
            text: 'Cancel'
          },
          {
            text: 'Send',
            type: 'button-positive',
            onTap: function(e) {
              ApiFactory.addOrderMessage(orderId, $rootScope.addMessageText).success(function() {
                service.infoModal('Your message has been sent.', 'Information');
                callback();
              }).catch(function() {
                service.infoModal('There has been an error, please try again.');
              });
            }
          }
        ]
      });
    },

    editModal: function(title, vendorKeyName, canBeEmpty, isNumeric) {
      canBeEmpty = canBeEmpty || false;
      isNumeric = isNumeric || false;

      var editBox = $ionicPopup.show({
        title: title,
        subTitle: canBeEmpty ? null : (isNumeric ? 'This field can only contain numbers' : 'This field cannot be empty'),
        template: '<input id="' + vendorKeyName + '" type="' + (isNumeric ? 'number' : 'text') + '" ' + (canBeEmpty ? '' : 'required') + ' ng-model="vendor.' + vendorKeyName + '" />',
        scope: $rootScope,
        buttons:[
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            type: 'button-positive',
            onTap: function(e) {
              if(!canBeEmpty && !$rootScope.vendor[vendorKeyName]) {
                e.preventDefault();
              } else {
                var updateInfo = {};
                updateInfo[vendorKeyName] = $rootScope.vendor[vendorKeyName];
                ApiFactory.updateSelf(updateInfo).success(function() {
                  service.infoModal('Your information has been updated.', 'Information');

                }).catch(function() {
                  service.infoModal('There has been an error, please try again.');
                });
              }
            }
          }
        ]
      });
    }
  };

  return service;
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
