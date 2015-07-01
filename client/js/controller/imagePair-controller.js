imageSliderApp
.controller("imageSliderController",["$scope","$http",function($scope,$http){
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
	    if(typeof $scope.imagePair != "undefined" && typeof $scope.offImage != "undefined" && typeof $scope.onImage != "undefined") {
	    	fd.append("imagePair", JSON.stringify($scope.imagePair));
	    	fd.append('offImage', $scope.offImage);
		    fd.append('onImage', $scope.onImage);
		    //console.log(fd.toString());
		    $http.post('/admin/upload', fd, {
		        transformRequest: angular.identity,
		        headers: {'Content-Type': undefined}
		    })
		    .success(function(res) {
		        //console.log(response);
		        //$scope.imagePair = response;
		        //load thanks.html
		        if(res.message == "success") location.href="/admin/";
		    }).error(function(response) {
		        $scope.imagePair.errorMessage = response.message;
		    });
	    }else{
	    	alert("All fields are required.");
	    }

	};
}])

.controller("imageSliderListController",["$scope","imageFactory",function($scope,imageFactory){
	var imageArray = imageFactory.getAllPicture();
	imageArray.then(function(data){
		data.forEach(function(image){
			image.off_image_url = image.off_image_url.substring(image.off_image_url.indexOf("/upload"));
			image.on_image_url = image.on_image_url.substring(image.on_image_url.indexOf("/upload"));
		});
		$scope.imageArray = data;
	},function(status){
		console.log(status);
	});
}])

.factory("imageFactory",["$http","$q",function($http,$q){
	var getAllPicture = function(){
		var defered = $q.defer();
		$http.get("/admin/showall")
			.success(function(result){
				 defered.resolve(result);
			}).
			error(function(error){
				 defered.reject(error);
			});
		return defered.promise;
	}
	return{
		getAllPicture: getAllPicture
	}

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