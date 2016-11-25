var randoApp = angular.module("randoApp");

randoApp.controller("TabsController", function($scope, $http, $location) {
  this.search = function () {
    var url = "/user/" + $("#search").val();
    $location.path(url);
  };
});
