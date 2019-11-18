const mongoose = require('mongoose');
const db = require('../models')
const User = mongoose.model('User');
const passport = require('passport');

// Defining methods for the user.controller
module.exports = {
// find a friend who's already on the app
  findById: function(req, res) {
    User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function(email) {
    return User.findOne({email: email}).lean();
  },
  // create a new user/ sign up function
  create: function(req, res) {
    console.log(req.body);
    User
      .create(req.body)
      .then(dbModel => {
        console.log("User Created");
        if (req.session.passport) {
          const userData = {
            ...req.session.passport.user,
            ...dbModel.toObject(),
            registered: true
          }
          console.log(userData);
          req.session.passport.user = userData;
        } else {
          const userData = {
            ...dbModel.toObject(),
            registered: true
          }
          req.session.passport.user = userData;
        }
        console.log("Done");
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  logout: function(req, res) {
    if(req.session) {
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        }
        res.json({status: "OK"})
      })
    }
  },
  mealPlan: function(req, res) {
    console.log(req.params);
    res.json({status: "OK"})
  },
  // remove a user/ delete profile function
  remove: function(req, res) {
    User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};