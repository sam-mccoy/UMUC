angular.module('OrderCloud-FeaturedItemsPolos', []);

angular.module('OrderCloud-FeaturedItemsPolos')
    .directive('featureditemspolos', featureditemspolos)
    .controller('FeaturedItemsPolosCtrl', FeaturedItemsPolosCtrl)
    .filter('featuredItemPolosFilter', featuredItemPolosFilter)
;

function featureditemspolos() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: FeaturedItemsPolosCtrl
    };
    return directive;

    function template() {
        return [
            '<style>',
            //'.featured-items { display:none; }',
            //'.featured-items.active { display:block; }',
            '.featured-items li { width:25%; float:left; }',
            '.featured-items li img { margin: 0 auto; max-height: 250px; width: auto;}',
            '.featured-items li a:hover { text-decoration:none }',
            '@media (max-width: 768px) { .featured-items li { width:100%; float:none; text-align:center; padding:15px 0; } } ',
            '</style>',
            '<div class="panel panel-default navy-header">',
            '<div class="panel-heading">',
            '<h3 class="panel-title">Polos</h3>',
            '</div>',
            '<div class="panel-body">',
            '<ul class="featured-items" ng-class="{\'active\': isActive(\'catalog\')}">',
            '<li ng-class="col-xs-3" ng-repeat="featureditem in featureditemsPolos">',
            '<a class="text-center" href="{{featureditem.link}}"><img class="img-responsive" ng-src="{{featureditem.image}}" />',
            '<br /><span>{{featureditem.name}}</span>',
            '</a>',
            '</li>',
            '</ul>',
            '</div>',
            '<div class="panel-footer text-right">',
            '<a href="catalog/umuc-polo">View More <i class="fa fa-chevron-right"></i></a>',
            '</div>',
            '</div>'
        ].join('');
    }
}

FeaturedItemsPolosCtrl.$inject = ['$scope', '$filter', '$location'];
function FeaturedItemsPolosCtrl($scope, $filter, $location) {

    $scope.featureditemsPolos = [];
    $scope.$watch('user.CustomFields', function(newVal){
        if (!newVal) return;
        if ($scope.featureditemsPolos) {
            $scope.featureditemsPolos = []; //reset the counter
            $scope.featureditemsPolos = $scope.featureditemsPolos.concat($filter('featuredItemPolosFilter')($scope.user.CustomFields, 'featuredItemPolo'));
        }
    });

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
}

function featuredItemPolosFilter() {
    return function (fields, name) {
        var result = [];
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1){
                var featureditem = {
                    image: field.File.Url,
                    link: field.Label,
                    name: field.UploadInstructions
                };
                if (featureditem.link.toUpperCase().indexOf("NONE") > -1) {
                    featureditem.link = null;
                }
                result.push(featureditem);
            }
        });
        return result;
    }
}
