var randoApp = angular.module("randoApp");

randoApp.controller("RandoWidgetController", function($scope, $http, $routeParams) {
  this.sendLabel = (randoId, label) => {
    $http.post('/label/' + randoId + '?label=' + label).success((output) => {
      console.log('label saved');
    });
  };
});
