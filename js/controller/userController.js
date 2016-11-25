var userController = angular.module("userController", ['ngResource']);

userController.controller("UserController", function($scope, $http, $routeParams, $route) {
    $http.get('/user?email=' + $routeParams.email + '&token=' + localStorage.getItem("authToken")).success(function (user) {
        $scope.user = user;
        $scope.user.banPritty = moment(user.ban).format('DD MMMM YYYY, HH:mm:ss');
        var notPairedRandos = 0;
        for (var i = 0; i < user.randos.length; i++) {
            var rando = user.randos[i];
            rando.user.creationPritty = moment(rando.user.creation).format('DD MMMM YYYY, HH:mm:ss');
            rando.stranger.creationPritty = moment(rando.stranger.creation).format('DD MMMM YYYY, HH:mm:ss');
            if (rando.stranger.imageURL == "") {
                rando.stranger.email = "_";
                rando.stranger.imageSizeURL.small = "http://s3.amazonaws.com/img.s.rando4me/reported.jpg";
                rando.stranger.mapSizeURL.small = "http://s3.amazonaws.com/img.s.rando4me/reported.jpg";
                notPairedRandos++;
            }
        }
        $scope.user.notPairedRandos = notPairedRandos;

        //TODO: DRY . see starsController - same function.
        $scope.starOrUnstar = function (email, randoId, $event) {
            var action = "star";
            if($($event.target).hasClass("star-active")) {
                action = "unstar";
            }
            $http({
                method: "POST",
                url: "/" + action + "?token=" + localStorage.getItem("authToken"),
                data: {
                    email: email,
                    randoId: randoId
                }
                }).success(function (res) {
                    if (action == "star") {
                        $($event.target).addClass("star-active");
                    } else {
                        $($event.target).removeClass("star-active");
                    }
                });
        };

        $scope.star = function (email, randoId, $event) {
            $http({
                method: "POST",
                url: "/star?token=" + localStorage.getItem("authToken"),
                data: {
                    email: email,
                    randoId: randoId
                }
            }).success(function (res) {
                alert("Starred");
            });
        };

        $scope.banOrUnBanUser = function(email, $event) {
            var action = "ban";
            if ($scope.user.ban > 0) {
                action = "unban";
            }
            $http({
                method: "POST",
                url: "/" + action + "?token=" + localStorage.getItem("authToken"),
                data: {
                    email: email,
                }
            }).success(function (res) {
                alert(action + "ned: " + email);
                if (res.command == "ban" && res.result == "done") {
                    $scope.user.ban = Date.now() + 99*365*24*60*60*1000;
                }

                if (res.command == "unban" && res.result == "done") {
                    $scope.user.ban = 0;
                }

                if ($scope.user.ban > 0) {
                    $($event.target).text("Unban " + email);
                } else {
                    $($event.target).text("Ban " + email);
                }
            }).error(function (err) {
                alert("Can't " + action + ", because: " + err);
            });

        };

        $scope.deleteOrUnDeleteRando = function(email, randoId, $event) {
            var action = "delete";
            if (!canDelete($scope.user.randos, randoId)) {
                action = "undelete";
            }

            $http({
                method: "POST",
                url: "/" + action + "?token=" + localStorage.getItem("authToken"),
                data: {
                    email: $routeParams.email,
                    rando: randoId
                }
            }).success(function (user) {
                alert(action + "d: " + randoId + " (" + email + ")");
                if (canDelete($scope.user.randos, randoId)) {
                    $($event.target).text("Undelete " + randoId);
                } else {
                    $($event.target).text("Delete " + randoId);
                }
            }).error(function (err) {
                alert("Can't " + action + ", because: " + err);
            });
        };

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

function canDelete(randos, randoId) {
    for (var i = 0; i < randos.length; i++) {
        if (randos[i].user.randoId == randoId && randos[i].user.delete == 0 || randos[i].stranger.randoId == randoId && randos[i].stranger.delete == 0) {
            return true;
        }
    }
    return false;
}
