angular.module('cp-vendor-app.services')

.service('ModalService', function($ionicPopup, $rootScope, OrdersFactory, VendorsFactory) {
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
              OrdersFactory.sendMessage(orderId, $rootScope.addMessageText.message).success(function() {
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
                VendorsFactory.updateSelf(updateInfo).success(function() {
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
});
