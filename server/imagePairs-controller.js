var models = require("./model");

var ImagePair 	= models.ImagePair,
 	fs 			= require('fs-extra'),
    formidable  = require("formidable"),
    ObjectId    = require("mongoose").Types.ObjectId;

var getErrorMessage = function(err) {
	var message = '';
	for (var errName in err.errors) {
		if (err.errors[errName].message) {
			message = err.errors[errName].message;
			return message;
		}
	}
	return message;
};


module.exports.showallimage = function(req,res){
    ImagePair.find({
    	 off_image_url: {"$ne":"comming soon"},
    	 on_image_url: {"$ne":"comming soon"}
	},function(err, result) {
	  if (err) return console.error(err);
	  res.json(result);
	});
};


module.exports.showExistedPair = function(req,res){
	var imageId = req.params.id;
	ImagePair.findOne({"_id":imageId},function(err,result){
		//console.log(result);
		res.json(result);
	});
};

var saveUpdate = function(){

}

module.exports.editExistedPair = function(req,res){
	var form = new formidable.IncomingForm();
	var result_from_DB = {};
	var offImage, onImage;
	form.maxFieldsSize = 5 * 1024 * 1024;
	form.uploadDir =  __dirname + "/upload/";
	form.encoding = 'utf-8';
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) {
    	var object_ = JSON.parse(fields.imagePair);
    	result_from_DB = object_;
    	//console.log(files);
    	if(typeof files.offImage != "undefined"){
    		offImage = files.offImage;
    	}
    	if(typeof files.onImage != "undefined"){
    		onImage = files.onImage;
    	}
		if(typeof files != "undefined"){
			var current_time = new Date();
			ImagePair.update({_id:new ObjectId(object_._id)},{
				$set:{
	      			off_image_url_title : object_.off_image_url_title,
	      			off_image_url_description : object_.off_image_url_description,
	      			on_image_url_title : object_.on_image_url_title,
	      			on_image_url_description : object_.on_image_url_description,
	      			updated: current_time
				}
			},function(err, numberAffected){
    			//if(numberAffected.ok == 1) res.status(200).send({"message":"success"});
			});
		}else{
			//return res.status(400).send({"message":"Please enter title,description and upload image!"});
		}
    });

	form.on("end", function(fields,files){
		if(this.openedFiles.length == 0 ){
			res.status(200).send({"message":"success"});
		}
		if(this.openedFiles.length == 1){
	        var temp_path = this.openedFiles[0].path;
	        var file_name = this.openedFiles[0].name;
	        var dateObj = new Date();
	        var fileName =  dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate() + '/'  +  file_name ;
			var new_file_name =  __dirname + "/upload/" + fileName;
			fs.copy(temp_path, new_file_name, function(err) {  
				if (err) console.error(err);
				else {
					fs.unlink(temp_path, function (err) { if (err) throw err;});
					//result_from_DB.off_image_url = new_file_name;
					if(typeof offImage != "undefined"){
						ImagePair.update({_id:new ObjectId(result_from_DB._id)},{
							$set:{
				      			off_image_url_title : result_from_DB.off_image_url_title,
				      			off_image_url_description : result_from_DB.off_image_url_description,
				      			on_image_url_title : result_from_DB.on_image_url_title,
				      			on_image_url_description : result_from_DB.on_image_url_description,
				      			off_image_url : new_file_name,
				      			updated: dateObj
							}
						},function(err, numberAffected){
			    			 if(err) { console.log(error)}
			    			 else  res.status(200).send({"message":"success"});
						});
					}
					if(typeof onImage != "undefined"){
						ImagePair.update({_id:new ObjectId(result_from_DB._id)},{
							$set:{
				      			off_image_url_title : result_from_DB.off_image_url_title,
				      			off_image_url_description : result_from_DB.off_image_url_description,
				      			on_image_url_title : result_from_DB.on_image_url_title,
				      			on_image_url_description : result_from_DB.on_image_url_description,
				      			on_image_url : new_file_name,
				      			updated: dateObj
							}
						},function(err, numberAffected){
			    			 if(err) { console.log(error)}
			    			 else  res.status(200).send({"message":"success"});
						});
					}

				}
			});
		}
		if(this.openedFiles.length == 2){
	        var temp_path = this.openedFiles[0].path;
	        var file_name = this.openedFiles[0].name;
	        var dateObj = new Date();
	        var fileName =  dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate() + '/'  +  file_name ;
			var new_file_name =  __dirname + "/upload/" + fileName;
			fs.copy(temp_path, new_file_name, function(err) {  
				if (err) console.error(err);
				else {
					fs.unlink(temp_path, function (err) { if (err) throw err;});
					//check the off or on image
				}
			});
			var temp_path_1 = this.openedFiles[1].path;
	        var file_name_1 = this.openedFiles[1].name;
	        var dateObj = new Date();
	        var fileName_1 =  dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate() + '/'  +  file_name_1 ;
			var new_file_name_1 =  __dirname + "/upload/" + fileName_1;
			fs.copy(temp_path_1, new_file_name_1, function(err) {  
				if (err) console.error(err);
				else {
					fs.unlink(temp_path_1, function (err) { if (err) throw err;});
					result_from_DB.on_image_url = new_file_name_1;
					ImagePair.update({_id:new ObjectId(result_from_DB._id)},{
						$set:{
			      			off_image_url_title : result_from_DB.off_image_url_title,
			      			off_image_url_description : result_from_DB.off_image_url_description,
			      			on_image_url_title : result_from_DB.on_image_url_title,
			      			on_image_url_description : result_from_DB.on_image_url_description,
			      			on_image_url : new_file_name_1,
			      			off_image_url : new_file_name,
			      			updated: dateObj
						}
					},function(err, numberAffected){
		    			 if(err) { console.log(error)}
		    			 else  res.status(200).send({"message":"success"});
					});
				}
			});
		}
	});
};


module.exports.saveNewPair = function(req,res){
  	var form = new formidable.IncomingForm();
	var result_from_DB;
	form.maxFieldsSize = 5 * 1024 * 1024;
	form.uploadDir =  __dirname + "/upload/";
	form.encoding = 'utf-8';
	form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
    	if (err) {
          console.error(err.message);
          return;
        }

    	if(typeof files.offimage != "undefined"){
    		var fileObj = files.offImage;
    		if(fileObj.type != "image/png" && fileObj.type != "image/jpg" && fileObj.type != "image/gif" && fileObj.type != "image/jpeg"){
    			 res.status(400).send({"message": "Image formats must be .gif, .jpg, .png"});
    			 res.end();
    		} 
    		if(fileObj.size > 5 *1024 * 1024 ){
    			 res.status(400).send({"message": "Image size is over limit(5MB)"});
    			 res.end();
    		}
    	}else{
			//res.status(400).send({"message": "Please enter off image"});
			//res.end();
    	}

    	if(typeof files.onimage != "undefined"){
    		var fileObj = files.onImage;
    		if(fileObj.type != "image/png" && fileObj.type != "image/jpg" && fileObj.type != "image/gif" && fileObj.type != "image/jpeg"){
    			 res.status(400).send({"message": "Image formats must be .gif, .jpg, .png"});
    			 res.end();
    		} 
    		if(fileObj.size > 5 *1024 * 1024 ){
    			 res.status(400).send({"message": "Image size is over limit(5MB)"});
    			 res.end();
    		}
    	}else{
    		//res.status(400).send({"message": "Please enter on image"});
			//res.end();
    	}

    });

    form.on('field', function(name, value) {
    	//console.log(value);
    	//console.log(name);
    	var object_ = value;
		//var registrant = new Registrant(JSON.parse(value));
		//console.log(value);
		if(typeof(value) != "undefined"){
			var imagePair_Obj = new ImagePair(JSON.parse(value));
			imagePair_Obj.off_image_url = "comming soon";
			imagePair_Obj.on_image_url = "comming soon";
	    	//for validation
		    imagePair_Obj.save(function(err,result){
				if (err) {return res.status(400).send({"message":getErrorMessage(err)});
			    }else{
			    	res.status(200).send({"message":"success"});
			    }
		    });
		}else{
			//return res.status(400).send({"message":"Please enter title,description and upload image!"});
		}
	});


    form.on('error', function(err) { console.log(err)});
    //check other fields
	form.on("end", function(fields,files){
		//console.log(this.openedFiles);

		//console.log(this.openedFiles);
		//console.log(result_from_DB);

        var temp_path = this.openedFiles[0].path;
        var file_name = this.openedFiles[0].name;
        var dateObj = new Date();
        var fileName =  dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate() + '/'  +  file_name ;
		var new_file_name =  __dirname + "/upload/" + fileName;
		fs.copy(temp_path, new_file_name, function(err) {  
			if (err) console.error(err);
			else {
				fs.unlink(temp_path, function (err) { if (err) throw err;});
				result_from_DB.off_image_url = new_file_name;
				result_from_DB.save(function(err,result){
					if (err) {return res.status(400).send({"message":getErrorMessage(err)});
				    }else return res.json(result);
			    });
			}
		});
        
        //console.log(result_from_DB);

		var temp_path_1 = this.openedFiles[1].path;
        var file_name_1 = this.openedFiles[1].name;
        var dateObj = new Date();
        var fileName_1 =  dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate() + '/'  +  file_name_1 ;
		var new_file_name_1 =  __dirname + "/upload/" + fileName_1;
		fs.copy(temp_path_1, new_file_name_1, function(err) {  
			if (err) console.error(err);
			else {
				//console.log(result_from_DB);
				fs.unlink(temp_path_1, function (err) { if (err) throw err;});
				result_from_DB.on_image_url = new_file_name_1;
				result_from_DB.save(function(err,result){
					if (err) {return res.status(400).send({"message":getErrorMessage(err)});
				    }else{
					   res.status(200).send({"message":"success"});
				    }
			    });
			}
		});
	});
} 