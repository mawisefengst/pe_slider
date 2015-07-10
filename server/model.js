var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	validator = function(property){
		if(property == null) return false;
		else return property.length;
	}

var projectIns = Schema({
	projectId : {
		type: Number,
		index : true
	},
	name : {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please have your project Name"]
	},
    banner_image_url:{
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please upload banner image"]
    },
    sponsor_image_url:{
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please upload sponsor image"]
    },
});
	
var ImagePair = Schema({
   id : {type : Number, index:true},
   created: {type: Date, default: Date.now},
   updated: {type: Date, default: Date.now},
    off_image_url: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please upload off image"]
	},
	off_image_url_title:{
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter off image text"]
	},
	off_image_url_description:{
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter off image description"]
	},
	on_image_url:  {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please upload on image"]
	},
	on_image_url_title:{
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please upload on image text"]
	},
	on_image_url_description:{
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please upload on image description"]
	}
});

var UserSchema = Schema({
    username: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your username"]
	},
    password: {
		type: String,
		trim: true,
		default: "",
		validate: [validator, "Please enter your password"]
	}
});



module.exports = {
	ImagePair :mongoose.model("ImagePair", ImagePair),
	ProjectIns : mongoose.model("Project", projectIns),
	UserSchema: mongoose.model("Admin",UserSchema)
};