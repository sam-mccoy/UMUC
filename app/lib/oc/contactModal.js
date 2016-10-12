angular.module('OrderCloud-ContactModal', []);

angular.module('OrderCloud-ContactModal')
    .directive('contactmodal', contactmodal)
    .controller('ContactModalCtrl', ContactModalCtrl)
;

function contactmodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'ContactModalCtrl'
    };
    return directive;

    function template() {
        return [
            '<li><a ng-click="openContact(500)"><i class="fa fa-phone-square"></i><span>{{\'Contact Us\' | r | xlat}}</span></a></li>'
        ].join('');
    }
}

ContactModalCtrl.$inject = ['$scope', '$modal'];
function ContactModalCtrl($scope, $modal) {

    $scope.animationsEnabled = true;

    $scope.openContact = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: contactmodalopen,
            controller: ContactModalOpenCtrl
        });

        function contactmodalopen() {
            return [
                '<style>',
                '.modal-header {background-color:#f5f5f5;border-bottom: 1px solid #ccc; min-height: 36px; padding: 2px;}',
                '.modal-header a {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
                '.modal-wrapper {width:100%; margin:0 auto; padding:0 20px 20px 20px;}',
                '.modal-wrapper h3 {margin-bottom:10px;}',
                '</style>',
                '<div class="modal-header" class="col-xs-12 row pull-right">',
                '<a class="pull-right close" ng-click="closeContact()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                '<div class="modal-wrapper">',
                '<h3 class="text-primary">Contact Us</h3>',
                'For questions or assistance please contact customer service at <a href="tel:888-798-3865">888-798-3865</a>, or send email to ' +
                '<a href="mailto:umuc.store@proforma.com">umuc.store@proforma.com</a>.',
                '</div>'
            ].join('');
        }

    };

    var ContactModalOpenCtrl = ['$scope', '$modalInstance', '$modal', function($scope, $modalInstance) {

        $scope.closeContact = function () {
            $modalInstance.close();
        };

    }];

}