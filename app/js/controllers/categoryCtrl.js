four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($routeParams, $sce, $scope, $451, Category, Product, Nav) {
	var
	categoryInteropKey = "451Custom.state.category.pageCache.categoryInteropID"
	,categoryPageKey = "451Custom.state.category.pageCache.pageNumber"
	,categoryInitialLoad = true
	,currentCategory = "localStorage" in window ? window.localStorage.getItem(categoryInteropKey) : null
	,currentPage = currentCategory && currentCategory == $routeParams.categoryInteropID ? +window.localStorage.getItem(categoryPageKey) : 1;

	$scope.productLoadingIndicator = true;
	$scope.settings = {
		currentPage: 1,
		pageSize: 40
	};

	if($routeParams.categoryInteropID != currentCategory){
		if("localStorage" in window){
			localStorage.removeItem(categoryInteropKey);
			localStorage.removeItem(categoryPageKey);
		}
	}
	else if(currentPage != $scope.settings.currentPage)
		setTimeout(function(){ $scope.settings.currentPage = currentPage; },100);

	$scope.trusted = function(d){
		if(d) return $sce.trustAsHtml(d);
	}

	function _search() {
		$scope.searchLoading = true;
		Product.search($routeParams.categoryInteropID, null, null, function (products, count) {
			$scope.products = products;
			$scope.productCount = count;
			$scope.productLoadingIndicator = false;
			$scope.searchLoading = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize);
	}

	$scope.$watch('settings.currentPage', function(n, o) {
		if("localStorage" in window && !categoryInitialLoad){
			window.localStorage.setItem(categoryInteropKey,$routeParams.categoryInteropID);
			window.localStorage.setItem(categoryPageKey,n);
		}

		if (n != o || (n == 1 && o == 1) || categoryInitialLoad)
			_search();

		categoryInitialLoad = false;
	});

	if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }
	else if($scope.tree){
		$scope.currentCategory ={SubCategories:$scope.tree};
	}


	$scope.$on("treeComplete", function(data){
		if (!$routeParams.categoryInteropID) {
			$scope.currentCategory ={SubCategories:$scope.tree};
		}
	});

    // panel-nav
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;
	$scope.$watch('sort', function(s) {
		if (!s) return;
		(s.indexOf('Price') > -1) ?
			$scope.sorter = 'StandardPriceSchedule.PriceBreaks[0].Price' :
			$scope.sorter = s.replace(' DESC', "");
		$scope.direction = s.indexOf('DESC') > -1;
	});

}]);
