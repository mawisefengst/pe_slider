
var express       			= require("express"),
	app      	  			= express(),
	mongoose 	  			= require("mongoose"),
	router 					= require("./server/router")(app);

app.use("/js", express.static(__dirname + "/client/js"));
app.use("/css", express.static(__dirname + "/client/css"));
app.use("/upload", express.static(__dirname + "/server/upload"));


var dbURI = "mongodb://localhost:27017/mean";
mongoose.connect(dbURI);

app.listen(3000,function(){
	console.log("I am listening");
});
