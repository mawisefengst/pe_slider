imageSliderApp
.controller("imageSliderController",["$scope","$http",function($scope,$http){
	$scope.registrant = {};
	$scope.registrant.errorMessage = "dddddd";
	$scope.saveNewOne = function(){
	    var fd = new FormData();
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

.controller("imageSlideUpdateController",["$scope","imageFactory","$http",function($scope,imageFactory,$http){
	var imageId = location.href.substring(location.href.lastIndexOf("/") + 1);
	var imageInc_promise = imageFactory.getSingelPicture(imageId);
	imageInc_promise.then(function(data){
		$scope.imagePair = data;
		$scope.imagePair.off_image_url = $scope.imagePair.off_image_url.substring($scope.imagePair.off_image_url.indexOf("/upload"));
		$scope.imagePair.on_image_url = $scope.imagePair.on_image_url.substring($scope.imagePair.on_image_url.indexOf("/upload"));
	},function(status){
		console.log(status);
	});

   	$scope.updateNewOne = function(){
   		//55944ae780ab62cc22035b2f
	    var fd = new FormData();
    	fd.append("imagePair", JSON.stringify($scope.imagePair));
    	fd.append('offImage', $scope.offImage);
	    fd.append('onImage', $scope.onImage);
	    //console.log(fd.toString());
	    $http.post('/admin/update', fd, {
	        transformRequest: angular.identity,
	        headers: {'Content-Type': undefined}
	    })
	    .success(function(res) {
	        if(res.message == "success") location.href="/admin/";
	    }).error(function(response) {
	        $scope.imagePair.errorMessage = response.message;
	    });
	};
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
	};
	var getSingelPicture = function(objectId){
		var defered = $q.defer();
		$http.get("/service/image/"+ objectId)
			.success(function(result){
				 defered.resolve(result);
			}).
			error(function(error){
				 defered.reject(error);
			});
		return defered.promise;
	}
	return{
		getAllPicture: getAllPicture,
		getSingelPicture : getSingelPicture
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