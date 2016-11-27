angular.module('OrderCloud-CarouselShirts', ['ngAnimate']);

angular.module('OrderCloud-CarouselShirts')
    .directive('customcarouselshirts', customcarouselshirts)
    .controller('customCarouselShirtsCtrl', customCarouselShirtsCtrl)
    .filter('intervalShirtsFilter', intervalShirtsFilter)
    .filter('carouselShirtsFilter', carouselShirtsFilter)
;

function customcarouselshirts() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: customCarouselShirtsCtrl
    };
    return directive;

    function template() {
        return [
            '<carousel interval="myInterval">',
            '<slide ng-repeat="slide in slides" active="slide.active">',
            '<a ng-if="slide.link" ng-href="{{slide.link}}" target="{{slide.link.indexOf(\'http\') > -1 ? \'_blank\' : \'_self\'}}">',
            '<img ng-src="{{slide.image}}">',
            '<div class="carousel-caption">',
            '<div ng-show="slide.text.toUpperCase() != \'NONE\'">{{slide.text}}</div>',
            '</div>',
            '</a>',
            '<span ng-if="!slide.link">',
            '<img ng-src="{{slide.image}}">',
            '<div class="carousel-caption">',
            '<div ng-show="slide.text.toUpperCase() != \'NONE\'">{{slide.text}}</div>',
            '</div>',
            '</span>',
            '</slide>',
            '</carousel>'
        ].join('');
    }
}

customCarouselShirtsCtrl.$inject = ['$scope', '$animate', '$filter'];
function customCarouselShirtsCtrl($scope, $animate, $filter) {
    $animate.enabled(false);
    $scope.slides = [];
    $scope.$watch('user.CustomFields', function(newVal){
        if (!newVal) return;
        $scope.slides = []; //reset the slide counter
        $scope.myInterval = ($filter('intervalShirtsFilter')($scope.user.CustomFields, 'interval') * 1000) || 5000;
        $scope.slides = $scope.slides.concat($filter('carouselShirtsFilter')($scope.user.CustomFields, 'UMUCCarouselShirtsImage'));
        //$scope.slides[0].active = true; /*causing the slider not to show for FacultyStaff group*/
    });
}

function intervalShirtsFilter() {
    return function (fields, name) {
        var result = null;
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1)
                result = field.DefaultValue;
        });
        return result;
    }
}

function carouselShirtsFilter() {
    return function (fields, name) {
        var result = [];
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1){
                var slide = {
                    text: field.UploadInstructions,
                    image: field.File.Url,
                    link: field.Label
                };
                if (slide.link.toUpperCase().indexOf("NONE") > -1) {
                    slide.link = null;
                }
                result.push(slide);
            }
        });
        return result;
    }
}

