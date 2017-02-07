var randoApp = angular.module("randoApp", [
  'ngRoute',
  'ngTable',
  'angular-loading-bar'
]);

randoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/randos', {
      templateUrl: '/template/randos.html',
      controller: 'RandosController'
    })
    .when('/stars', {
      templateUrl: '/template/stars.html',
      controller: 'StarsController'
    })
    .when('/user/:email', {
      templateUrl: '/template/user.html',
      controller: 'UserController'
    })
    .when('/reports', {
      templateUrl: '/template/reports.html',
      controller: 'LogsController'
    })
    .when('/api', {
      templateUrl: '/template/api.html',
      controller: 'ApiController'
    })
    .when('/status', {
      templateUrl: '/template/status.html',
      controller: 'StatusController'
    })
    .when('/anomalies', {
      templateUrl: '/template/anomalies.html',
      controller: 'AnomaliesController'
    })
    .when('/exchange', {
      templateUrl: '/template/exchange.html',
      controller: 'ExchangeController'
    })
    .when('/calendar', {
      templateUrl: '/template/calendar.html',
      controller: 'CalendarController'
    })
    .otherwise({redirectTo: '/status'});
  }]);

randoApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);


$(document).ready(function() {
  $("#menu li").on("click", function () {
    $("#menu li").removeClass("active");
    $(this).addClass("active");
  });
});
