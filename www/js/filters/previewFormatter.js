angular.module('cp-vendor-app.filters')

.filter('previewFormatter', function() {
  return function(message) {
    if (!message) {
      return '';
    }

    var formattedMessage = message.slice(0, 35);

    formattedMessage.length < 35 ? null : formattedMessage += '...';

    return formattedMessage;
  }
});
