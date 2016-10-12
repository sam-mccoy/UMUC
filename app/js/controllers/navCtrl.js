four51.app.controller('NavCtrl', ['$location', '$route', '$scope', '$451', 'User',
    function ($location, $route, $scope, $451, User) {
        $scope.Logout = function(){
            User.logout();
            if ($scope.isAnon) {
                $location.path("/catalog");
                User.login(function(user) {
                    $scope.user = user;
                });
            }
        };

        $scope.Redirect = function(){
            User.logout();
            $window.location.href = "https://sso.umuc.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://umucauth.tela.com/shibboleth&shire=https://umucauth.tela.com/Shibboleth.sso/SAML2/POST";
        };

        // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
        $scope.isActive = function(path) {
            var cur_path = $location.path().replace('/', '');
            var result = false;

            if (path instanceof Array) {
                angular.forEach(path, function(p) {
                    if (p == cur_path && !result)
                        result = true;
                });
            }
            else {
                if (cur_path == path)
                    result = true;
            }
            return result;
        };
        // extension of above isActive in path
        $scope.isInPath = function(path) {
            var cur_path = $location.path().replace('/', '');
            var result = false;

            if(cur_path.indexOf(path) > -1) {
                result = true;
            }
            else {
                result = false;
            }
            return result;
        };

        $scope.Clear = function() {
            localStorage.clear();
        }

        $scope.$on('event:orderUpdate', function(event, order) {
            $scope.cartCount = (order ? ((order.Status == 'Unsubmitted') ? order.LineItems.length : null) : null);
        });
    }]);