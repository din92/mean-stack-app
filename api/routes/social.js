
var app = require("express");
var router = app.Router();
var ctrlAuth = require("../controllers/auth.controller")
var passport = require("passport");

router
      .get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))
      .get("/auth/facebook/callback",passport.authenticate('facebook',{
        successRedirect: '/profile',
        failureRedirect: '/register'
      },ctrlAuth.setTokenCookie))
      .get("/",passport.authenticate('facebook',{
        failureRedirect: '/register'
      }));
router
      .get('/auth/twitter', passport.authenticate('twitter'))
      .get("/auth/twitter/callback",passport.authenticate('twitter',{
        successRedirect: 'http://localhost:3000/profile',
        failureRedirect: '/register'
      },ctrlAuth.setTokenCookie));

module.exports = router;