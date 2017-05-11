var randoApp = angular.module("randoApp");

randoApp.controller("RandosController", function($scope, $http, $routeParams) {

    $http.get('/randos').success(function (randos) {
        $scope.randos = randos;
        $scope.flipRando = function (rando, $event) {
            var img = $event.target;
            if (img.src.indexOf("img.s") != -1) {
                img.src = rando.mapSizeURL.small;
            } else {
                img.src = rando.imageSizeURL.small;
            }
        };
    });
});
