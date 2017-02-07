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

  $scope.getAllMetrics = function (exchange) {
    return Array.from(new Set(exchange.metrics.map(metrics => metrics.metrica))).sort();
  };

  $scope.getRandosIds = function (exchange) {
    return Array.from(new Set(exchange.metrics.map(metrics => metrics.randoId.substring(0, 6); + " - " + exchange.randos.filter(rando => {return metrics.randoId === rando.randoId})[0].email ))).sort();
  };

  $scope.getMarksForRandoId = function (randoId, exchange) {
    var marks = exchange.metrics.filter(metrics => {return randoId === metrics.randoId});
    marks.sort((a,b) => {return (a.metrica > b.metrica) ? 1 : ((b.metrica > a.metrica) ? -1 : 0);}); 
    return marks;
  };

  $http.get("/exchangelogs?limit=50").success(function (exchange) {
    $scope.exchange = exchange;
    $scope.exchangeIndex = 0;
  });
  
});
