'use strict';

var mongoose = require('mongoose');
var colors = require('colors');

mongoose.connect('mongodb://localhost:mean-todo', (err) => {  // to connect to MongoDB, use the Mongoose connect method
  if (err) {
    // throw err;
    console.log(colors.red.bold.underline('Failed to connect to MongoDB. (Make sure MongoDB is running.)'));
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});
