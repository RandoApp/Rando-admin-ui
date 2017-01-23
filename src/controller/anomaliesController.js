var randoApp = angular.module("randoApp");

randoApp.controller("AnomaliesController", function($scope, $http, $routeParams) {
  $scope.countByTag = function (anomalies, tag) {
    return anomalies.filter( (anomaly) => {
      return anomaly.discrepancyReason === tag;
    }).length;
  };

  $scope.filterByTag = function (tag) {
    $scope.anomalies = $scope.allAnomalies.filter( (anomaly) => {
      return anomaly.discrepancyReason === tag;
    });
  };

  $http.get("/anomalies").success(function (anomalies) {
    for (var i = 0; i < anomalies.length; i++) {
      anomalies[i].detectedAtPritty = moment.utc(anomalies[i].detectedAt).format('DD MMMM YYYY, HH:mm:ss');
    }
    $scope.anomalies = anomalies;
    $scope.allAnomalies = anomalies;
  });

});

