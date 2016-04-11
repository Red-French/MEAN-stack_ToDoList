'use strict';

var angular = require('angular');

angular.module('todoListApp')
.controller('todoCtrl', function($scope, dataService) {

  $scope.deleteTodo = function(todo, index) {
    dataService.deleteTodo(todo).then(function() {
      $scope.todos.splice(index, 1);
    });
  };

  $scope.saveTodos = function() {
    var filteredTodos = $scope.todos.filter(function(todo){ // filters a list of todos
      if(todo.edited) {
        return todo
      };
    })
    dataService.saveTodos(filteredTodos)  // the fitered list of todos from above gets
                                         // sent to the saveTodos method in services/data.js
    .finally($scope.resetTodoState());
  };

  $scope.resetTodoState = function() {  // must be assigned to an anonymous function
    $scope.todos.forEach(function(todo) {
        todo.edited = false;  // reset the property edited on each todo to 'false'
    });
  };
});
