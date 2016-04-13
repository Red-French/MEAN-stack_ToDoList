'use strict';
// ROUTER

var express = require ('express');
var router = express.Router();
var Todo = require('../models/todo');  // capitalizing the variable is convention when referencing a model, class or constructor function in JavaScript
// var todoList = require('../../mock/todos.json');  // importing mock data

// READ
router.get('/todos', (req, res) => {  // /todos gets mounted to router which uses '/api' (set up in app.js), so the route will be '/api/todos'
  // res.send({'These are the todos!'});
  // res.send({todos: []});
  Todo.find({}, (err, todos) => {  // The model's 'find' method.
                // The first parameter of the find method is going to be a JSON object where you pass conditions of the documents you want to find.
                  // * An empty object here would return everything
                // The second paramenter of the find method is going to be a callback function which takes 2 arguments; a potenial error and the data.
    if (err) {
      return res.status(500).json({message: err.message});
    }
   res.json({todos: todos});  // .json does basically the same thing as .send, but there are slight differences.
                          // res.json eventually calls res.send, but before that it:
                          // - Respects the json spaces and json replacer app settings
                          // - Ensures the response will have utf8 charset and application/json content-type
  });
});

// CREATE
router.post('/todos', (req, res) => {  // first parameter is the URL of the request
  var todo = req.body;  // the body of the request will be the data for the todo
  Todo.create(todo, (err, todo) => {   // Use the create method on the Todo model to store the data to MongoDB
                        // The first parameter is the todo that's being saved
                        // The second parameter is a callback function with a potential error as the first parameter
                        // and the new todo as the second parameter
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'todo': todo, message: 'Todo Created'});  // send json response with key/value pairs
  });
});

// UPDATE
router.put('/todos/:id', (req, res) => {  // add an id parameter for the put route; the syntax for adding parameters is colon then parameter name
  var id = req.params.id;  // get the id key from the req.params object (this is handled by Express)
  var todo = req.body;  // the data for the todo
  if (todo && todo._id !== id) { // if there is a todo and its id does not match the requested id
    return res.status(500).json({err: "IDs don't match!"});
  }
  Todo.findByIdAndUpdate(id, todo, {new: true}, (err, todo) => {   // The Mongoose model has a 'findByIdAndUpdate' method
                        // The first parameter is the id from the route which Mongoose will use for lookup
                        // The second parameter is the new data being sent to MongoDB
                        // The third parameter is an options parameter, which is an object with our options. This is telling Mongoose to return the new (updated) data.
                        // The fourth parameter is the callback function with potential error and the new todo
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'todo': todo, message: 'Todo Updated'});  // send json response with key/value pairs
  });
});

// DELETE
router.delete('/todos/:id', function(req, res) {  // add an id parameter for the put route; the syntax for adding parameters is colon then parameter name
  var id = req.params.id;  // get the id key from the req.params object (this is handled by Express)
  Todo.findByIdAndRemove(id, function(err, result) {  // The Mongoose model has a 'findByIdAndRemove' method
                          // The first parameter is the id from the route which Mongoose will use for lookup
                          // The second parameter is the callback function with potential error
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Todo Deleted' });  // send json response with key/value pair
  });
});

module.exports = router;
