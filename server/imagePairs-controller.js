var models = require("./model");

var ImagePair = models.ImagePair;

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


module.exports.saveNewPair = function(req,res){
   //res.status(400).send({"message": "I"});
   var imagePair_Obj = new ImagePair();
   imagePair_Obj.save(function(err,result){
		if (err) {return res.status(400).send({"message":getErrorMessage(err)});
	    }else return res.json(result);
    });
  // res.end();*/
} 