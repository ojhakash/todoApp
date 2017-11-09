todoApp.controller('createTodoController',['todoService','$location',function (todoService,$location) {
  var main = this; //this controller is for create todo
  this.options = [];

  this.createTodo = function(){
    var todoItem;
    var todoData ={
      todoItem:main.todoItem
    }
    console.log(todoItem);
    todoService.addTodo(todoData)
    .then(function successCallback(response){
      console.log(response);
      $location.path('/');
    },function errorCallback(reason){
      alert('An error occurred! Try Again.');
    });

  };

}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('yellow')
      .dark();
  });
