var randoApp = angular.module("randoApp");

randoApp.controller("ExchangeController", function($scope, $http, $routeParams) {
  $http.get("/exchangelogs?limit=50").success(function (exchange) {
    $scope.exchange = exchange;
    $scope.exchangeIndex = 0;
  });
  
});
