'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:mean-todo', (err) => {  // to connect to MongoDB, use the Mongoose connect method
  if (err) {
    throw err;
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});
