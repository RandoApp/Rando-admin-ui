var randoApp = angular.module("randoApp");

randoApp.controller("BansController", function($scope, $http, $routeParams) {

  this.find = function () {
    var start = $('#startdatetimepicker').data('DateTimePicker').date();
    var end = $('#enddatetimepicker').data('DateTimePicker').date();
    var zone = start.zone();
    start.minutes(start.minutes() - zone);
    end.minutes(end.minutes() - zone);

    $http.get("/bans?banStart=" + start.utc().valueOf() + "&banEnd=" + end.utc().valueOf() + "&offset=" + $scope.offset + "&limit=" + $scope.limit).success(function (bans) {
      $scope.bans = bans;
    });
  };
});
