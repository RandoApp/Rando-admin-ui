var randoApp = angular.module("randoApp", [
  'ngRoute',
  'randosController',
  'starsController',
  'userController',
  'statusController',
  'logController',
  'logsController',
  'apiController',
  'ngTable'
]);

randoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/auth', {
      templateUrl: '/template/auth.html',
      controller: 'AuthController'
    })
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
    .when('/logs', {
      templateUrl: '/template/logs.html',
      controller: 'LogsController'
    })
    .when('/api', {
      templateUrl: '/template/api.html',
      controller: 'ApiController'
    })
    .when('/log/:logFile', {
      templateUrl: '/template/log.html',
      controller: 'LogController'
    })
    .when('/status', {
      templateUrl: '/template/status.html',
      controller: 'StatusController'
    })
    .otherwise({redirectTo: '/status'});
  }]);


$(document).ready(function() {
  $("#menu li").on("click", function () {
    $("#menu li").removeClass("active");
    $(this).addClass("active");
  });
});
