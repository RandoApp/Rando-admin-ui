var randoApp = angular.module("randoApp");

randoApp.controller("ScriptsController", function($scope, $http, $location) {

  $scope.runScript = function (script) {
    $http.post("/scripts/"+script).success(function (output) {
      $scope.output = output.res;
      $scope.stats = output.stats;
      $scope.executedScript = script;
    });
  };

  $scope.pritty = function (script) {
    return script.replace(/-/g, " ");
  };

  $http.get("/scripts").success(function (scripts) {
    $scope.scripts = scripts;
  });
  
});
