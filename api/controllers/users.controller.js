var mongoose = require("mongoose");
var usermodel = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs")
var jwt = require("jsonwebtoken");

module.exports.registerUser = function(req,res){
console.log("registering user");

var username = req.body.username;
var name = req.body.name;
var password = req.body.password;

usermodel.create({
		username:username,
		name : name,
		password:bcrypt.hashSync(password,bcrypt.genSaltSync(10))
		},function(err,user){
		if(err){
			console.log("error registering the user " + err);
			res.status(400).json(err);
		}
		else if(!user){
			console.log("user cannot be registered");
			res.status(404).json({"message":"user cannot be registered"});
		}
		else
		{
			console.log("User successfully registered");
			res.status(201).json(user);
		}
	});
}
module.exports.findUser=function(req,res){
var username = req.params.username;
usermodel.findOne({username:username})
		.exec(function(err,user){
			if(err){
				console.log("Some error occured in finding the user "+err);
				res.status(400).json(err);
			}
			else if(!user){
				console.log("user not found");
				res.status(404).json({"message":"User not found"});
			}
			else{
				console.log("User found");
				res.status(200).json(user);
			}
		});
}

//Update user
module.exports.updateUser=function(req,res){
var username = req.params.username;
usermodel.findOne({username:username})
		.exec(function(err,user){
			if(err){
				console.log("Some error occured in finding the user "+err);
				res.status(400).json(err);
			}
			else if(!user){
				console.log("user not found");
				res.status(404).json({"message":"User not found"});
			}
			else{
				console.log("User found to update");
				user.name = req.body.name;
				user.username=username;
				user.save(function(err,updated){
					if(err){
						console.log("Some error occured in updating the user "+err);
						res.status(500).json(err);
					}
					else if(!updated){
						console.log("Failure in updating user");
						res.status(400).json({"message":"Failure in updating user"});
					}
					else{
						console.log("User data updated");
						res.status(204).json(updated);
					}
				})
			}
		});
}
module.exports.loginUser = function(req,res){
var username = req.body.username;
var password = req.body.password;

usermodel
	.findOne({username : username})
	.exec(function(err,user){
		if(err){
			console.log("Failure logging in the user");
			res.status(400).json(err);
		}
		else if(!user){
			console.log("user not found");
			res.status(404).json({"message":"User not found"});
		}
		else
		{ if(bcrypt.compareSync(password,user.password)){
			var token= jwt.sign({username:user.username},'asdsa',{expiresIn:3600});
			console.log("The user is successfully logged in");
			var result = {
				token:token,
				admin:user.admin
			}
			res.status(200).json(result);
		}
			else{
				console.log("Unauthorized login");
			res.status(401).json({"message":"Unauthorized log in"});
			}
		}
	});
}

module.exports.authenticateUser= function(req,res,next){
	var header = req.headers.authorization;
	console.log(header)
	if(header){
		var token = req.headers.authorization.split(" ")[1];
		console.log("Token:"+token);
		jwt.verify(token,"asdsa",function(err,decoded){
			if(err){
				console.log(err+" Unauthorized user "+"Token: "+token);
			res.status(401).json({"message":"Unauthorized log in"});
			}
			else{
				req.user = decoded.username;
				next();
			}
			
		})

	}
	else{
		console.log("No token provided");
			res.status(403).json({"message":"No token provided "});
	}
}


