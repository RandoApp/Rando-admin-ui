angular.module("randoApp").directive("randoWidget", ['$http', ($http) => {
  return {
    restrict: "AE",
    templateUrl: "/template/rando-widget.html",
    link: function($scope, element, attributes) {
      var randoId = attributes.randoid;
      $http.get('/label/' + randoId).success(function(labels) {});
    }
  };
}]);
