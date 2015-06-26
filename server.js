
var express       			= require("express"),
	app      	  			= express(),
	mongoose 	  			= require("mongoose"),
	model    	  			= require("./server/model"),
	imagePairsController    = require("./server/imagePairs-controller");



app.use("/js", express.static(__dirname + "/client/js"));
app.use("/css", express.static(__dirname + "/client/css"));

var dbURI = "mongodb://localhost:27017/mean";

mongoose.connect(dbURI)



app.get("/",function(req,res){
	res.send("home page");
});


app.get("/admin/upload",function(req,res){
	res.sendFile(__dirname +"/client/view/upload.html");
});

app.post("/admin/upload", imagePairsController.saveNewPair);

app.listen(3000,function(){
	console.log("I am listening");
});
