var randoApp = angular.module("randoApp");

randoApp.controller("UserController", function($scope, $http, $routeParams, $route) {

    $http.get('/user?email=' + $routeParams.email).success(function (user) {
        $scope.user = user;

        for (var i = 0; i < user.in.length; i++) {
            var rando = user.in[i];
        }
        for (var i = 0; i < user.out.length; i++) {
            var rando = user.out[i];
        }

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
                url: "/" + action + "/" + email,
            }).success(function (res) {
                alert(JSON.stringify(res));
                if (res.ban === 0) {
                    $scope.user.ban = null;
                } else {
                 $scope.user.ban = res.ban;
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
