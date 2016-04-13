'use strict';
// SERVICES/DATA (CONNECT TO API BACK-END)

var angular = require('angular');

angular.module('todoListApp')
.service('dataService', function($http, $q) {  // use Angular's $q provider to bundle/manage requests to the server
  this.getTodos = function(cb) {
    $http.get('/api/todos').then(cb);  // this is the route set up in the server and api/index.js
  };

  this.deleteTodo = function(todo) {
    if (!todo._id) {  // if todo does not have an id then...
      return $q.resolve();
    }
    return $http.delete('/api/todos/' + todo._id).then(function() {  // append with the todo id
      console.log("I deleted the " + todo.name + " todo!");
    });
  };

  this.saveTodos = function(todos) {
    var queue = [];  // create an array of requests
    todos.forEach(function(todo) {  // for each todo, push a request for posting the data to the server to the queue array
      var request;
      if(!todo._id) {  // if todo does not have an id then...
        request = $http.post('/api/todos', todo)  // the request = the route and the body of the request (the todo)
      } else {  // HANDLE UPDATES - if the todo does have an id
        request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {  // append with the todo id
          todo = result.data.todo;
          return todo;
        });
      }
      queue.push(request);  // push the request
    });
    return $q.all(queue).then(function(results) {  // By creating an array of requests, can now use the $q service
                                                   // to run all requests in parallel.
                                                   // The 'all' method iterates through the queue, runs each request and
                                                   // then, for all of them, returns a promise.
      console.log('I saved ' + todos.length + ' todos!');
    });
  };

});
