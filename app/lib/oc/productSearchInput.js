angular.module('OrderCloud-ProductSearchInput', []);

angular.module('OrderCloud-ProductSearchInput')
    .directive('productsearchinput', productsearchinput)
    .controller('ProductSearchInputCtrl', ProductSearchInputCtrl)
;

function productsearchinput() {
    var directive = {
        restrict: 'E',
        template: searchTemplate,
        controller: 'ProductSearchInputCtrl'
    };
    return directive;

    function searchTemplate() {
        return [
            '<div class="product-search-display" ng-if="displayProductSearch">',
            '<div class="col-xs-12">',
            '<form name="productSearchInput" ng-submit="executeSearch(productSearchTerm)">',
            '<div class="view-form-icon">',
            '<div class="input-group">',
            '<input type="text" class="form-control" placeholder="{{\'Search\' | r}}" ng-model="productSearchTerm"/>',
            '<i class="fa fa-search"></i>',
            '<span class="input-group-btn">',
            '<button type="submit" class="btn btn-warning" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'">{{\'Search\' | r}}</button>',
            '</span>',
            '</div>',
            '</div>',
            '</form>',
            '</div>',
            '</div>'
        ].join('');
    }
}

ProductSearchInputCtrl.$inject = ['$scope','$location'];
function ProductSearchInputCtrl($scope, $location) {
    $scope.displayProductSearch = false;
    $scope.executeSearch = function(term) {
        var searchTerm = term;
        $scope.productSearchTerm = null;
        $scope.displayProductSearch = false;
        $location.path('search/' + searchTerm);
    };
}