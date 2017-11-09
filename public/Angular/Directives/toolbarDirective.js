todoApp.directive('toolbarCard',function(){
  return {
		restrict : "E",
		templateUrl : "/views/toolbar-card-view.html",
		controller:'toolbarController',
		controllerAs:'toolbarInfo'
	};
});
