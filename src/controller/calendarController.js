var randoApp = angular.module("randoApp");

randoApp.controller("CalendarController", function($scope, $http, $routeParams) {
  this.scanRandos = function () {
    var start = $('#startdatetimepicker').data('DateTimePicker').date();
    var end = $('#enddatetimepicker').data('DateTimePicker').date();
    $http.get("/calendar?start=" + start + "&end=" + end).success(function (randos) {
      for (var i = 0; i < randos.length; i++) {
        randos[i].creationPritty = moment(randos[i].creation).format('DD MMMM YYYY, HH:mm:ss');
      }
      $scope.randos = randos;
    });
  };
});
