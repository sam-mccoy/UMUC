angular.module('OrderCloud-FixedFooter', []);

angular.module('OrderCloud-FixedFooter')
    .directive('fixedfooter', fixedfooter)
    .controller('FixedFooterCtrl', FixedFooterCtrl)
;

function fixedfooter() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'FixedFooterCtrl'
    };
    return directive;

    function template() {
        return [
            '<footer class="fixed-footer-bottom-wrapper" ng-class="{\'active\': isInPath(\'catalog\') || isInPath(\'product\') || isInPath(\'admin\') || isInPath(\'search\') || isInPath(\'order\') || isInPath(\'address\') || isInPath(\'addresses\') || isInPath(\'contactus\') }">',
            '<div class="fixed-footer-bottom">',
            '<div class="col-xs-12">',
            '<div class="col-xs-12 col-md-6 copyright">',
            'Copyright &copy; {{year}} University of Maryland University College. All Rights Reserved.',
            '</div>',
            '<div class="col-xs-12 col-md-6 terms">',
            '<a target="_blank" href="http://www.umuc.edu">UMUC.EDU</a>',
            '<a target="_blank" href="http://umuc.edu/webpolicy/index.cfm">Terms &amp; Conditions</a>',
            '<a target="_blank" href="http://umuc.edu/webpolicy/privacy/index.cfm">Privacy Policy</a>',
            '</div>',
            '</div>',
            '</div>',
            '</footer>'
        ].join('');
    }
}

FixedFooterCtrl.$inject = ['$scope', '$location'];
function FixedFooterCtrl($scope, $location) {

    var d = new Date();
    $scope.year = d.getFullYear();


    // from NavCtrl.js
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

}