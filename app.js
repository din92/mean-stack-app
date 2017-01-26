var express = require("express");
var app = express();
require('./api/data/db.js');
var path = require("path");
var bodyparser = require("body-parser");
var passport = require('passport')
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var routes = require("./api/routes/index");
var social = require("./api/routes/social")
var config = require("./api/config/index");

//Defining the port for the application to run
app.set("port",3000);

//logging each request along with the method
app.use(function(req,res,next){
	console.log(req.method+" "+req.url);
	next();
})
//Defining static folders for the site
app.use(express.static(path.join(__dirname,"Public")));
app.use("/node_modules",express.static(path.join(__dirname,"/node_modules")));
/*app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname , '/Public/index.html'));
});
app.use('/hotels', function(req, res) {
    res.send(res.json());
});*/
app.use(passport.initialize());
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

require('./api/controllers/auth.controller').setupFacebook(config);
require('./api/controllers/auth.controller').setupTwitter(config);

//Declaring body-parser for the pos	ted forms
app.use(bodyparser.urlencoded({extended:false}));  
app.use(bodyparser.json());

//Defining routes for the api
app.use("/api",routes);
app.use(social);
var server=app.listen(app.get("port"),function(){
	var port = server.address().port;
	console.log("Application is listening on port: "+ port);
})