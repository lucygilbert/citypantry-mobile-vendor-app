angular.module('cp-vendor-app.factories', [])

.factory('ApiFactory', function(ApiService, API_BASE) {
  return {
    getOrdersByCurrentVendor: function() {
      return ApiService.get(API_BASE + '/orders/by-current-vendor');
    },

    getOrder: function(id) {
      return ApiService.get(API_BASE + '/orders/' + id);
    },

    acceptOrder: function(id) {
      return ApiService.put(API_BASE + '/order/' + id + '/accept');
    },

    setDeliveryStatus: function(id, status) {
      return ApiService.put(API_BASE + '/order/' + id + '/delivery-status', { deliveryStatus: status });
    },

    getOrdersWithMessages: function() {
      return ApiService.get(API_BASE + '/orders/with-messages');
    },

    getOrderMessages: function(id) {
      return ApiService.get(API_BASE + '/orders/' + id + '/messages');
    },

    addOrderMessage: function(id, message) {
      return ApiService.put(API_BASE + '/orders/' + id + '/messages', message);
    },

    logIn: function(email, password) {
      return ApiService.post(API_BASE + '/user/login', { email: email, plainPassword: password });
    },

    getAuthenticatedUser: function() {
      return ApiService.get(API_BASE + '/users/get-authenticated-user');
    },

    updateSelf: function(updateInfo) {
      return ApiService.put(API_BASE + '/vendors/me', updateInfo);
    },
  };
});
