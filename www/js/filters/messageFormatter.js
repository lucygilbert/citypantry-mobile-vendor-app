angular.module('cp-vendor-app.filters')

.filter('messageFormatter', function() {
  return function(message) {
    if (!message) {
      return '';
    }

    var formattedMessage = message.replace('\n', '<br/>');

    return formattedMessage;
  }
});
