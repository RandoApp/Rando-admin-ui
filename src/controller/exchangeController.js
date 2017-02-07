var randoApp = angular.module("randoApp");

randoApp.controller("ExchangeController", function($scope, $http, $location) {

  $scope.nextExchange = function () {
    $scope.exchangeIndex++;
    if ($scope.exchangeIndex >= $scope.exchange.length ) {
      $scope.exchangeIndex = $scope.exchangeIndex.length - 1;
    }
  };

  $scope.prevExchange = function () {
    $scope.exchangeIndex--;
    if ($scope.exchangeIndex <= 0) {
      $scope.exchangeIndex = 0;
    }
  };

  $scope.getDevPrefix = function () {
    if ($location.host().indexOf("dev") !== -1) {
      return "dev.";
    } else {
      return "";
    }
  };

  $http.get("/exchangelogs?limit=50").success(function (exchange) {
    $scope.exchange = exchange;
    $scope.exchangeIndex = 0;
  });
  
});
