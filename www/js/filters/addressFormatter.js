angular.module('cp-vendor-app.filters', [])

.filter('addressFormatter', function() {
  return function(address, multi) {
    if (!address) {
      return '';
    }

    var separator = (multi ? ', <br />' : ', ');

    return address.addressLine1 +
          (address.addressLine2 ? separator + address.addressLine2 : '') +
          (address.addressLine3 ? separator + address.addressLine3 : '') +
          (address.city ? separator + address.city : '') +
          (address.postcode ? separator + address.postcode : '') +
          (address.countryName ? separator + address.countryName : '');
    };
});
