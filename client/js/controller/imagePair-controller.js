imageSliderApp.controller("imageSliderController",["$scope","$http",function($scope,$http){
	$scope.registrant = {};
	$scope.registrant.errorMessage = "dddddd";
	$scope.saveNewOne = function(){
	    var fd = new FormData();
	    //fd.append('offImage', $scope.offImage);
	    //fd.append('onImage', $scope.onImage);
	   /* for(var key in $scope.registrant){
	       fd.append(key, $scope.registrant[key]);
	       console.log(key + " " + $scope.registrant[key]);
	    }*/
	    fd.append("imagePair", JSON.stringify($scope.imagePair));
	    fd.append('offImage', $scope.offImage);
	    fd.append('onImage', $scope.onImage);
	    //console.log(fd.toString());
	    $http.post('/admin/upload', fd, {
	        transformRequest: angular.identity,
	        headers: {'Content-Type': undefined}
	    })
	    .success(function(response) {
	        //console.log(response);
	        $scope.imagePair = response;
	        //load thanks.html
	    }).error(function(response) {
	        $scope.imagePair.errorMessage = response.message;
	    });
	};

}])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

;