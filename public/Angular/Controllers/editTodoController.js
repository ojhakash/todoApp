todoApp.controller('editTodoController',['todoService','$routeParams','$location',function (todoService,$routeParams,$location) {
  var main = this; //this controller is for editing a specific todo
  this.id = $routeParams.id;

  this.editTodo = function() {
    todoService.getSingleTodo(main.id)
    .then(function successCallback(response) {
      console.log(response.data);
      main.todoItem = response.data.todoItem;
      console.log(main.todoItem);
    },function errorCallback(reason) {
      alert('Try Again! An error occurred.');
    });
  };

  this.updateTodo = function() {
    var todoItem;
    var todoData ={
      todoItem:main.todoItem
    }
    console.log(todoData);
    todoService.updateTodo(main.id,todoData)
    .then(function successCallback(response){
      console.log(response);
      alert('todo updated successfully!')
      $location.path('/');
    },function errorCallback(reason){
      alert('An error occurred! Try Again.');
    });
  };

}]);
