const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedRecipeSchema = new Schema({
    name: {type: String, required: true},
    url: {type: String, required: true, unique: true},
    ingredients: {type: Array},
    method: {type: String, required: true},
    user: {type: String, required: true},
    date: { type: Date, default: Date.now }
});

const savedRecipes = mongoose.model("SavedRecipes", savedRecipeSchema);

module.exports = savedRecipes;