var randoApp = angular.module("randoApp");

randoApp.controller("CalendarController", function($scope, $http, $routeParams) {

  this.scanRandos = function () {
    var start = $('#startdatetimepicker').data('DateTimePicker').date();
    var end = $('#enddatetimepicker').data('DateTimePicker').date();
    var zone = start.zone();
    start.minutes(start.minutes() - zone);
    end.minutes(end.minutes() - zone);

    $http.get("/calendar?start=" + start.utc().valueOf() + "&end=" + end.utc().valueOf()).success(function (randos) {
      $scope.randos = randos;
    });
  };
});
