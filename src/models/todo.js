'use strict';

var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

var model = mongoose.model('Todo', todoSchema);  // Mongoose will create a model called 'Todo' using the 'todoSchema'

module.exports = model;
