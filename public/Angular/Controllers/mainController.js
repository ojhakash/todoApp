todoApp.controller('mainController',['todoService',function (todoService) {
  var main = this; //this controller is for getting all todos and delete any todos
  this.options =[];
  this.todo;
  this.getAllTodos = function () {
    todoService.getAllTodos()
    .then(function successCallback(response){
      console.log(response.data);
      main.todos = response.data;
      main.todoOptions = response.data.options;
      console.log(response.data);
    },function errorCallback(reason) {
      alert('An error occurred! Try Again.');
    })
  };
  this.toggleOptions = function (option,id) {
      if(main.todo === undefined || main.todo.id === id){
        var todo = _.find(main.todos,function (todo) {
            return todo.id === id;
        });

        var idx = main.options.indexOf(option);
        if (idx > -1) {
          main.options.splice(idx, 1);
        }
        else {
          main.options.push(option);
        };
        todo.answers = main.options;
        main.todo = todo;
        console.log(main.todo);
      }else{
        alert('Your request has failed!');
        window.location.reload();
      };
    };

  this.submitAnswers = function(){
    var answerData ={
      answer:main.todo.answers
    }
    console.log(answerData);
      todoService.postAnswers(answerData,main.todo.id)
      .then(function successCallback(response) {
        console.log(response);
        window.location.reload();
      },function errorCallback(reason) {
        alert('An error occurred! Try Again.');
      });
  };

  this.deleteTodo = function(id){
    console.log(id);
    todoService.deleteTodo(id)
    .then(function successCallback(response) {
      console.log(response);
      alert('todo deleted successfully!');
      window.location.reload();
    },function errorCallback(reason) {
      alert('An error occurred! Try Again.');
    });
  };
}])
