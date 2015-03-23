angular.module('cp-vendor-app.filters')

.filter('previewFormatter', function() {
  return function(message) {
    if (!message) {
      return '';
    }

    var formattedMessage = message;

    if (formattedMessage.length > 35) {
      formattedMessage = message.slice(0, 35);
      formattedMessage += '...';
    }

    return formattedMessage;
  };
});
