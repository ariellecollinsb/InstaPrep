var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  blurb: {
    type: String
  }

});

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;