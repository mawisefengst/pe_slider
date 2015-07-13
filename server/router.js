var imagePairsController    = require("./imagePairs-controller"),
 	path				    = require('path'),
 	passport                = require("passport"),
 	LocalStrategy           = require("passport-local").Strategy,
	expressSession			= require("express-session"),
 	models 					= require("./model"),
    User 					= models.UserSchema,
    cookieParser			= require("cookie-parser"),
    bodyParser				= require("body-parser"),
    bCrypt 					= require("bcrypt-nodejs"),
    isValidPassword = function(user, password){
	  return bCrypt.compareSync(password, user.password);
	},
	createHash = function(password){
	 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

var router  = function(app){


	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(cookieParser());
	
	// For session data:
	app.use(expressSession({
				secret: 'tannedkrab',
	            resave: true,
	            saveUninitialized: true,
	            cookie:{
				     maxAge : 360000 // one hour in millis
				}
    }));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(
		function(username, password, done){
	       User.findOne({"username" : username}, 
		       	function(err,user){
		       		if(err) return done(null,false);
		       		if(!user){
		       			console.log("User Not Found with username " + username);
		       		    done(null,null);
		       		}
		       		if(!isValidPassword(user, password)){
		       			console.log("Invalid Password");
		       		    done(null,null);
		       		}
	       		    /*var newUser = new User();
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.save(function(err){
						if(err){
							console.log("Error in Saving user:" + err);
							throw err;
						}
						console.log("User Registration Successful");
						return done(null, newUser);
					})*/ 
		       	    done(null,user);
		       	}
	       )
		}
	));

	passport.serializeUser(function(user,done){
		done(null,user._id);
	});

	passport.deserializeUser(function(id,done) {
		/*User.findById(id, function(err,user){
			done(err,user);
		});*/
		done(null,{id:id,name:id});
	});
                               
	/*passport.use(new LocalStrategy(function(username,password,done){
			User.findOne({"username": username},function(err, user){
				if(err){
					console.log("Error in SingUp: " + err);
					return done(err);
				}
				if(user){
					console.log("User already exists");
					return done(null,false, req.flash("message","User Already Exists"));
				}else{
					var newUser = new User();
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.save(function(err){
						if(err){
							console.log("Error in Saving user:" + err);
							throw err;
						}
						console.log("User Registration Successful");
						return done(null, newUser);
					})
				}
			});
		}
	));*/


	app.get("/",function(req,res){
		res.send("home page");
	});

    /*app.get("/admin/",function(req,res){
		var resolved_path = path.resolve(__dirname+'../../client/view/list.html');
		res.sendFile(resolved_path);
	});*/

	//app.get("/admin")
	app.get('/admin', requireAuth, adminHandler);

	function requireAuth(req, res, next){
	  //console.log(req);
	  // check if the user is logged in
	  if(!req.isAuthenticated()){
	   // req.session.messages = "You need to login to view this page";
	    res.redirect('/admin/signup');
	  }
	  next();
	}

	function adminHandler(req, res, next){
	  console.log(req);
	}


	app.get("/admin/signup",function(req,res){
		var resolved_path = path.resolve(__dirname+'../../client/view/signup.html');
		res.sendFile(resolved_path);
	});


   /* app.post('/admin/signup', 
	  passport.authenticate('local', { failureRedirect: '/admin/signup', failureFlash: true }),
	  function(req, res) {
	    res.redirect('/admin/list');
	 });*/


    app.post('/admin/signup', passport.authenticate('local'), function(req,res) {
    	console.log(req.isAuthenticated());
    	//console.log(user);
        //if(!user) res.redirect('/admin/signup');
        res.redirect('/admin/list');
	});
  

    app.get("/admin/list",requireAuth,function(req,res){
		var resolved_path = path.resolve(__dirname+'../../client/view/list.html');
		res.sendFile(resolved_path);
	});

	/*app.post("/login" ,passport.authenticate('local',{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);*/

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
 
	app.get("api/login",function(){

	})
    


}

module.exports = router;


