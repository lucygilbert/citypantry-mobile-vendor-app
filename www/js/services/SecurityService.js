angular.module('cp-vendor-app.services')

.service('SecurityService', function($state) {
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

        isVendor: function() {
          return this.inGroup(['admin', 'user']);
        },

        requireLoggedIn: function() {
            if (!this.isLoggedIn()) {
                $state.go('login');
            }
        },

        requireLoggedOut: function() {
            if (this.isLoggedIn()) {
                $state.go('redirectToHomepage');
            }
        },

        requireVendor: function() {
            if (!this.isVendor()) {
                $state.go('redirectToHomepage');
            }
        }
    };
});
