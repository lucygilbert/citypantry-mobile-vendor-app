angular.module('cpLibIntegration', [])
  .service('ApiAuthService', function() {
    return function() {
      var apiAuth = JSON.parse(localStorage.getItem('apiAuth')) ?
      JSON.parse(localStorage.getItem('apiAuth')) : {userId:'', salt:''};
      return {
        userId: apiAuth.userId,
        authToken: apiAuth.salt
      };
    };
  });
