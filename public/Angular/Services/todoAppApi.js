todoApp.factory('todoService',function todoFactory($http) {
  var todoApi = {};
  var baseUrl = "http://localhost:3000/";

  todoApi.getAllTodos = function(){
    return $http({
      method:'GET',
      url:baseUrl + 'todos'
    });
  };

  todoApi.addTodo = function(todoData){
    return $http({
      method:'POST',
      url:baseUrl + 'todos',
      data:todoData
    });
  };

  todoApi.postOptions = function (id,optionData) {
    return $http({
      method:'POST',
      url:baseUrl + 'todos/' + id + '/options/create/',
      data:optionData
    });
  }

  todoApi.postAnswers = function(answerData,id){
    return $http({
      method:'POST',
      url:baseUrl + 'todos/' + id + '/answers/create/',
      data:answerData
    });
  };

  todoApi.getSingleTodo = function(id){
    return $http({
      method:'GET',
      url:baseUrl + 'todos/' + id
    });
  };

  todoApi.updateTodo = function (id,todoData) {
    return $http({
      method:'PUT',
      url:baseUrl + 'todos/' + id,
      data:todoData
    });
  };

  todoApi.deleteTodo = function (id) {
    return $http({
      method:'DELETE',
      url:baseUrl + 'todos/' + id
    });
  };
  return todoApi;

});
