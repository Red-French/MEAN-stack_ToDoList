'use strict';
// SEED DATA

var Todo = require('./models/todo.js');

var todos = [
  'Feed the dogs',
  'Wash the truck',
  'Cut some wood'
];

todos.forEach((todo, index) => {  // for each element in the todos array,
  Todo.find({'name': todo}, (err, todos) => {  // look for a todo with a name equal to the string
    if (!err && !todos.length) { // if there is no error and that todo doesn't exist
      Todo.create({completed: false, name: todo});  // then create that todo with a completed property set to false
                                                    // and with a name of the current todo
    };
  });
});
