var randoApp = angular.module("randoApp");

randoApp.controller("AnomaliesController", function($scope, $http, $routeParams) {

  $scope.refreshAnomalies = function (anomalies) {
    $scope.anomalies = anomalies;
    $scope.allAnomalies = anomalies;
  };

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

  $scope.moveToRandosBucket = function (randoId) {
    if (confirm("Your rando will be moved to randos bucket. All tags will be removed. Are you sure?")) {
      $http.post("/anomaly-move/" + randoId).success(function (anomalies) {
        $scope.refreshAnomalies(anomalies);
        alert("Anomaly MOVED. RandoId: " + randoId);
      }).error(function (err) {
        alert("CanNOT move anomaly with RandoId: " + randoId + " because: " + JSON.stringify(err));
      });
    }
  };

  $scope.deleteFromAnomalies = function (randoId) {
    if (confirm("Your rando will be DELETE from anomalies, but will be save in user out. Are you sure that you want to delete this anomaly?")) {
      $http.post("/anomaly-delete/" + randoId).success(function (anomalies) {
        $scope.refreshAnomalies(anomalies);
        alert("Anomaly DELETED. RandoId: " + randoId);
      }).error(function (err) {
        alert("CanNOT delete anomaly with RandoId: " + randoId + " because: " + JSON.stringify(err));
      });
    }
  };

  $http.get("/anomalies").success(function (anomalies) {
    $scope.refreshAnomalies(anomalies);
  });
  
});
