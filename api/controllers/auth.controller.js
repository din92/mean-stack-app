var mongoose = require("mongoose");
var usermodel = mongoose.model("User");
var passport = require("passport");
var facebookStrategy = require("passport-facebook").Strategy
var TwitterStrategy = require("passport-twitter").Strategy
var jwt = require("jsonwebtoken")

module.exports.setupFacebook = function () {
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
                    if (err) return done(err);
                    if (!user) {
                        user = new usermodel({
                            name: profile.givenName + " " + profile.familyName,
                            username: profile.displayName,
                            provider: 'facebook',
                            admin: false,
                            facebook: profile._json

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

module.exports.setupTwitter = function () {
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
module.exports.setTokenCookie=function(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = jwt.sign({username:req.user.username},"asdsa",{ expiresIn:3600});
  var result = {
				token:token,
				admin:req.user.admin
			}
  res.status(200).json(result);
  res.redirect('/');
}

