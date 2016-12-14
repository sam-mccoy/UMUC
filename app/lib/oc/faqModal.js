angular.module('OrderCloud-FAQModal', []);

angular.module('OrderCloud-FAQModal')
    .directive('faqmodal', faqmodal)
    .controller('FAQModalCtrl', FAQModalCtrl)
;

function faqmodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'FAQModalCtrl'
    };
    return directive;

    function template() {
        return [
            '<li><a ng-click="openFAQ(1000)"><i class="fa fa-question"></i><span>{{\'FAQs\' | r | xlat}}</span></a></li>'
        ].join('');
    }
}

FAQModalCtrl.$inject = ['$scope', '$modal'];
function FAQModalCtrl($scope, $modal) {

    $scope.animationsEnabled = true;

    $scope.openFAQ = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: faqmodalopen,
            controller: FAQModalOpenCtrl
        });

        function faqmodalopen() {
            return [
                '<style>',
                '.modal-header {background-color:#f5f5f5;border-bottom: 1px solid #ccc; min-height: 36px; padding: 2px;}',
                '.modal-header a {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
                '.modal-wrapper {width:100%; margin:0 auto; padding:0 20px 20px 20px;}',
                '.modal-wrapper h3 {margin-bottom:10px;}',
                '.modal-wrapper ol { margin-left: -25px; }',
                '.modal-wrapper li, .modal-wrapper p { line-height:20px; font-size:12px; margin-bottom:10px;}',
                '.modal-wrapper p { margin-left: 0; }',
                '.modal-wrapper li span {font-weight:bold;}',
                '.modal-wrapper .contact a { font-size:14px; }',
                '.modal-wrapper h4 { text-transform:uppercase; font-size:14px; font-weight:bold; }',
                '</style>',
                '<div class="modal-header" class="col-xs-12 row pull-right">',
                '<a class="pull-right close" ng-click="closeFAQ()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                '<div class="modal-wrapper">',
                '<h3 class="text-primary">Frequently Asked Questions</h3>',
                '<ol>',
                '<li><span>Is there a UMUC on-campus bookstore where I can purchase UMUC Gear?</span><br />',
                'The UMUC GEAR store is only available online through this website.',
                '</li>',
                '<li><span>Where can I purchase a frame for my diploma or a UMUC class ring?</span><br />',
                'Diploma frames aswell as UMUC class rings are available for purchase through Oak Hall and Balfour website:',
                '<a target="_blank" href="www.oakhalli.com/college/UMUC/">www.oakhalli.com/college/UMUC/</a>',
                '</li>',
                '<li><span>Can I pay with a personal check?</span><br />',
                'To ensure fast and secure transactions, we can only accept payments by credit card.',
                '</li>',
                '<li><span>I am shipping to the US. How long will it take to receive a shipment?</span><br />',
                'Stateside shipments take 1 - 2 weeks for delivery.',
                '</li>',
                '<li><span> I am shipping my order overseas. How long will it take to receive a shipment?</span><br />',
                'Overseas shipments take 4 - 6 weeks for delivery, depending on the country to where your order will be shipped.',
                '</li>',
                '<li><span>How are packages shipped?</span><br />',
                'All packages are shipped UPS Ground Service, except for APO and FPO addresses, which are shipped via the United States Postal Service.',
                '</li>',
                '</ol>',
                '<h3 class="text-primary">Return Policy</h3>',
                '<h4>Defective and/or Damaged Merchandise</h4>',
                '<p>We will be happy to exchange, credit or refund your merchandise if your item was received damaged or' +
                'defective. Items must be returned to UMUC Online Store/ Proforma Warehouse, with original packaging and accompanied by a copy of your' +
                'invoice/packing slip. All transactions will be handled promptly. We cannot credit or refund the freight cost of any returned items, unless' +
                'the merchandise is considered defective or damaged during shipping. Please contact Proforma so that we can process your return.</p>',
                '<p>If a replacement is authorized it will be shipped to you at no charge. Please call Proforma to request a return shipping authorization number ' +
                'and a UPS shipping label will be sent to you to facilitate your return.</p>',
                '<span class="contact"><a href="tel:888-798-3865">1-888-798-3865</a><br />',
                '<a href="mailto:umuc.store@proforma.com">umuc.store@proforma.com</a></span>',
                '<h4>Shipping Address for returning Defective and/or Damaged Merchandise</h4>',
                '<address>',
                'Proforma Fulfillment Center<br />',
                'Attn: UMUC Gear<br />',
                '4597 Van Epps Road<br />',
                'Brooklyn Heights, OH 44131<br />',
                '<a href="tel:888-798-3865">1-888-798-3865</a>',
                '</address>',
                '</div>'
            ].join('');
        }

    };

    var FAQModalOpenCtrl = ['$scope', '$modalInstance', '$modal', function($scope, $modalInstance) {

        $scope.closeFAQ = function () {
            $modalInstance.close();
        };

    }];

}