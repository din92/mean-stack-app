var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
	username:{
		type:String,
		unique:true,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	admin:{
		type:Boolean,
		default:false
	}
});
mongoose.model("User",userSchema)