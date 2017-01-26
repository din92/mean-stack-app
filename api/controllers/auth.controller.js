var mongoose = require("mongoose");
var usermodel = mongoose.model("User");
var bcrypt = require("bcrypt");
var passport = require("passport");
var facebookStrategy = require("passport-facebook").Strategy
var TwitterStrategy = require("passport-twitter").Strategy
var jwt = require("jsonwebtoken")


module.exports.setupFacebook = function (config) {
       passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        usermodel.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new facebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
        function (accessToken, refreshToken, profile, done) {
            usermodel.findOne({
                "facebook.id": profile.id
            })
                .exec(function (err, user) {
                    if (err) {
                        console.log("Hi error generated herre"+err);
                        return done(err);}
                    if (!user) {
                        console.log(profile.displayName.split(" ")[0]);
                        user = new usermodel({
                           // name: profile.givenName + " " + profile.familyName,
                           name:profile.displayName,
                            username: profile.displayName.split(" ")[0],
                            password: bcrypt.hashSync(profile.displayName.split(" ")[0],bcrypt.genSaltSync(10)),
                            provider: 'facebook',
                            admin: false,
                            facebook: profile._json

                        });
                        user.save(function (err, saved) {
                            if (err){
                                console.log("Error saving user:"+ err);
                                
                                return done(err);
                            }
                                
                            else {
                                console.log(saved);
                                return done(err, saved)};

                        })
                    }
                    else {
                        console.log("Already there" + user);
                        return done(err, user);
                    }
                })
        }
    ))
}

module.exports.setupTwitter = function (config) {
     // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        usermodel.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL
    },
        function(accessToken,refreshToken,profile,done){
            usermodel.findOne({
                "twitter.id_str":profile.id,
            })
            .exec(function(err,user){
                if (err) return done(err);
                    if (!user) {
                        user = new usermodel({
                            name: profile.displayName,
                            username: profile.username,
                             password: bcrypt.hashSync(profile.username,bcrypt.genSaltSync(10)),
                            provider: 'twitter',
                            admin: false,
                            twitter: profile._json

                        })
                        user.save(function (err, saved) {
                            if (err)
                                return done(err);
                            else return done(err, user);

                        })
                    }
                    else {
                        return done(err, user);
                    }
            })
        }
    ))
}
module.exports.setToken=function(req, res) {
    console.log("request is "+req);
    console.log("response is "+res);
  if (!req.user)  res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = jwt.sign({username:req.user.username},"asdsa",{ expiresIn:3600});
  var result = {
				token:token,
				admin:req.user.admin
			}
  res.status(200).json(result);
  res.redirect('/');
}

