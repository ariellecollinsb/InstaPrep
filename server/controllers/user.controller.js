const mongoose = require('mongoose');
const db = require('../models')
const User = mongoose.model('User');
const passport = require('passport');
const moment = require("moment");

// Defining methods for the user.controller
module.exports = {
  // find a friend who's already on the app
  findById: function (req, res) {
    User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (email) {
    return User.findOne({ email: email }).lean();
  },
  // create a new user/ sign up function
  create: function (req, res) {
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
          req.session.passport.user = userData;
          res.json(userData)
        } else {
          const userData = {
            ...dbModel.toObject(),
            registered: true
          }
          req.session.passport.user = userData;
          res.json(userData);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  logout: function (req, res) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
        res.json({ status: "OK" })
      })
    }
  },
  addMeal: function (req, res) {
    User.findById(req.session.passport.user._id)
      .then(user => {
        user.addMeal(req.body.week, req.body.day, req.body.meal);
        res.json({ status: "OK" })
      })
      .catch(error => res.json({ status: "error" }));
  },
  getMeals: function (req, res) {
    let week = moment(req.params.week + 'T00:00:00Z').toDate();
    User.findById(req.session.passport.user._id)
      .then(user => {
        res.json(user.getMeals(week))
      })
      .catch(error => res.json({ status: "error", error: error }));
  },
  getShoppingList: function (req, res) {
    let week = moment(req.params.week + 'T00:00:00Z').utc().toDate();
    User.findById(req.session.passport.user._id)
      .then(user => {
        res.json(user.getShoppingList(week))
      })
      .catch(error => res.json({ status: "error", error: error }));
  },
  // remove a user/ delete profile function
  remove: function (req, res) {
    User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};