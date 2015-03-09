angular.module('cp-vendor-app.services', [])

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
});