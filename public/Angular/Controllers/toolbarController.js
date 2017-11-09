todoApp.controller('toolbarController',['$mdSidenav','$location',function($mdSidenav,$location) {
        this.openRightMenu = function() { //this is for the toolbar directive on the top of the page
          $mdSidenav('right').toggle();
      };
        this.directToHome = function () {
          $location.path('/');
          $mdSidenav('right').close();
        }
        this.directToAddtodo = function () {
          $mdSidenav('right').close();
          $location.path('/create');
        }
}]);
