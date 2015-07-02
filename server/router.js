var imagePairsController    = require("./imagePairs-controller"),
 	path				    = require('path')

var router  = function(app){
	app.get("/",function(req,res){
		res.send("home page");
	});

    app.get("/admin/",function(req,res){
		var resolved_path = path.resolve(__dirname+'../../client/view/list.html');
		res.sendFile(resolved_path);
	});

	app.get("/admin/update/:id",function(req,res){
		var id = req.params.id;
		//console.log(id);
		//console.log(req.param);
		var resolved_path = path.resolve(__dirname+'../../client/view/update.html');
		res.sendFile(resolved_path,{imageid:id});
	});

	app.get("/admin/showall",imagePairsController.showallimage);
	
	app.get("/admin/upload",function(req,res){
		var resolved_path = path.resolve(__dirname+'../../client/view/upload.html');
		res.sendFile(resolved_path);
	});

	app.post("/admin/upload", imagePairsController.saveNewPair);
	app.post("/admin/update", imagePairsController.editExistedPair);


	app.get("/service/image/:id/",imagePairsController.showExistedPair);
    
}

module.exports = router;


