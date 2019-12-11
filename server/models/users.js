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
  provider: { type: String, default: '' },
  name: { type: String, default: '', required: true },
  age: { type: Number, required: true },
  gender: String,
  interests: [String],
  about: String,
  mealPlans: [
    {
      week: Date,
      days: [{
        day: String,
        meals: [{
          title: String,
          href: String,
          ingredients: String,
          thumbnail: String
        }]
      }]
    }

  ]
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email) {
  return new Promise(resolve => {
    const User = mongoose.model('User');
    if (this.skipValidation()) return resolve(true);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email }).exec((err, users) => resolve(!err && !users.length));
    } else resolve(true);
  });
}, 'Email `{VALUE}` already exists');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, 'Password cannot be blank');


UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHash('sha256').update(password).digest('base64');
    } catch (err) {
      console.log(err);
      return '';
    }
  },
  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  },
  getMeals: function (week) {
    console.log("Getting Meals", week, this.mealPlans);
    var weekIndex = this.mealPlans.findIndex((v) => {
      console.log(v);
      console.log(Date(v.week).getTime(), week.getTime());
      return new Date(v.week).getTime() === week.getTime();
    });
    console.log(weekIndex);
    if (weekIndex > -1) {
      return this.mealPlans[weekIndex];
    }
    return [];
  },
  getShoppingList: function (week) {
    var weekIndex = this.mealPlans.findIndex((v) => {
      return new Date(v.week).getTime() === week.getTime();
    });
    if (weekIndex > -1) {
      let shoppingList = [];
      this.mealPlans[weekIndex].days.forEach(day => {
        day.meals.forEach(meal => {
          let ingredients = meal.ingredients.split(",");
          ingredients.forEach(ingredient => {
            if (shoppingList.indexOf(ingredient.trim()) === -1) {
              shoppingList.push(ingredient.trim());
            }
          })
        });
      });
      return shoppingList;
    }
    return [];
  },
  addMeal: function (week, day, meal) {
    var weekIndex = this.mealPlans.findIndex((v) => {
      return new Date(v.week).getTime() === new Date(week).getTime();
    });
    if (weekIndex === -1) {
      // Add Week
      this.mealPlans.push({
        week: week,
        days: [{
          day: day,
          meals: [
            meal
          ]
        }]
      });
    } else {
      var dayIndex = this.mealPlans[weekIndex].days.findIndex((v) => {
        return v.day === day;
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
        this.mealPlans[weekIndex].days[dayIndex].meals.push(meal);
      }
    }
    return this.save();
  }
}

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
