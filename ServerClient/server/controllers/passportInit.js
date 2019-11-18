const session = require('express-session');
const passport = require('passport');
// const { Strategy: TwitterStrategy } = require('passport-twitter')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
// const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: GithubStrategy} = require('passport-github')
const { GOOGLE_CONFIG, GITHUB_CONFIG} = require('../config')
const UserController = require("./user.controller");
const User = require("../models/users");
module.exports = (app) => { 

  // saveUninitialized: true allows us to attach the socket id to the session
  // before we have athenticated the user
  app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true,
    cookie : { secure : false }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  //passport.deserializeUser((obj, cb) => cb(null, obj))
  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  // The function that is called when an OAuth provider sends back user 
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const googleCallback = (accessToken, refreshToken, profile, cb) => {
    UserController.findByEmail(profile.emails[0].value)
      .then(function(response){
        if (!response) {
          cb(null, {
            name: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
            registered: false
          });
        } else {
          const userData = {
            ...response,
            photo: profile.photos[0].value,
            registered: true
          }
          cb(null, userData)
        }
      });
  }

  // Adding each OAuth provider's strategy to passport
  // passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))'
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, googleCallback));
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.authenticate(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  // passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
  //passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}// lib/passport.init.js
 