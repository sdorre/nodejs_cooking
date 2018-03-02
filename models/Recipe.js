var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
        name: String,
        temperature: Number,
        duration: Number,
        ingredients: [{ quantity: Number, unit: String, name: String }],
        instructions: [{ step: Number, desc: String }],
        author: String,
        updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
