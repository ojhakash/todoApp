todoApp.controller('createOptionsController',['todoService','$routeParams','$location',function (todoService,$routeParams,$location) {
  var main = this; //this controllers ins for creating/updating options in a particular todo
  this.id = $routeParams.id;
  this.options = [];

  this.addOptions = function() {
    main.options.push(main.option);
    console.log(main.options);
  };
  this.createOptions = function() {
    var optionData = {
      options:main.options
    }
    todoService.postOptions(main.id,optionData)
    .then(function successCallback(response) {
      console.log(response);
      $location.path('/');
    },function errorCallback(alert) {
      alert('An error occurred! Try Again.');
    })
  };
}])
