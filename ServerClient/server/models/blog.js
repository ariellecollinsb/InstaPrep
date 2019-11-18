var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

});

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;