var randoApp = angular.module("randoApp");

randoApp.controller("CommonController", function ($scope, $http, $routeParams, $route) {

  this.makeDatePritty = function (date) {
    if (moment(date).isValid()) {
      return moment(date).format('DD MMMM YYYY, HH:mm:ss');
    } else {
      return "---";
    }
  };

});
