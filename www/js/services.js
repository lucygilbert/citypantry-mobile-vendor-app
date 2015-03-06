angular.module('starter.services', [])

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
