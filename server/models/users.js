const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');
const oAuthTypes = ['google', 'github'];

// https://github.com/madhums/node-express-mongoose-demo
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"] //regex is faster to do than a validate to verify an email address
    },
    hashed_password: { type: String, trim: true },
    provider: { type: String, default: ''},
    name: { type: String, default: '', required: true},
    age: { type: Number, required: true},
    gender: String,
    interests: [String],
    about: String,
    mealPlans: [
      {
        week: Date,
        days: [{
          day: String,
          meals: {
            name: String,
            url: String,
            ingredients: String,
            thumbnail: String
          }
        }]
      }
      
    ]
});

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.path('email').validate(function(email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function(email) {
  return new Promise(resolve => {
    const User = mongoose.model('User');
    if (this.skipValidation()) return resolve(true);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email }).exec((err, users) => resolve(!err && !users.length));
    } else resolve(true);
  });
}, 'Email `{VALUE}` already exists');

UserSchema.path('hashed_password').validate(function(hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, 'Password cannot be blank');


UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto.createHash('sha256').update(password).digest('base64');
    } catch (err) {
      console.log(err);
      return '';
    }
  },
  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  },
  addMeal: function(week, day, meal) {
    var dayIndex = -1;
    var weekIndex = this.mealPlans.findIndex(function(v, i) {
      v.week = week;
    });
    if (weekIndex === -1 ) {
      // Add Week
      this.mealPans.push({
        week: week,
        days: [{
          day: day,
          meals: [ 
            meal
          ]
        }]
      });
    } else {
      var dayIndex = this.mealPlans[weekIndex].findIndex(function(v, i) {
        v.day === day;
      });

      if (dayIndex === -1) {
        //Add Day
        this.mealPlans[weekIndex].days.push({
          day: day,
          meals: [
            meal
          ]
        })
      } else {
        this.mealPlans[weekIndex].days[dayIndex].meals.push([
          meal
        ]);
      }
    }

    console.log(this.mealPlans);

    return this.save();
  }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
