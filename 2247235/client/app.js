(() => {
    "use strict";

    angular.module("myApp", ["ngRoute"])

        .controller("MyController", function ($scope, $http) {
        $http.get("http://localhost:3000/").then(function (response) {
            $scope.datas = response.data;
        });
        })

        .controller("createController", function ($scope) {
        $scope.createEntry = function () {
            var newData =
            '{"id":"' +
            $scope.id +
            '", "name":"' +
            $scope.name +
            '", "designation":"' +
            $scope.designation +
            '", "department":"' +
            $scope.department +
            '", "salary":"' +
            $scope.salary +
            '", "location":"' +
            $scope.location +
            '"}';

            fetch("http://localhost:3000/new", {
            method: "POST",
            body: newData,
            headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
            $scope.id = "";
            $scope.name = "";
            $scope.designation = "";
            $scope.department = "";
            $scope.salary = "";
            $scope.location = "";
        };
        })

        .controller("updateController", function ($scope, $http) {
        $http.get("http://localhost:3000/").then(function (response) {
            $scope.datas = response.data;
        });

        $scope.getLoc = function () {
            var selectedLoc = $scope.Loc;
            console.log(selectedId);
            $scope.name = selectedLoc["name"];
            $scope.designation = selectedLoc["designation"];
            $scope.department = selectedLoc["department"];
            $scope.salary = selectedLoc["salary"];
            $scope.location = selectedLoc["location"];
        };

        $scope.updateEntry = function () {
            var newData =
            '{"id":"' +
            $scope.id["id"] +
            '", "name":"' +
            $scope.name +
            '", "designation":"' +
            $scope.designation +
            '", "department":"' +
            $scope.department +
            '", "salary":"' +
            $scope.salary +
            '", "location":"' +
            $scope.location +
            '"}';

            fetch("http://localhost:3000/update", {
            method: "POST",
            body: newData,
            headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
            $scope.id = "";
            $scope.name = "";
            $scope.designation = "";
            $scope.department = "";
            $scope.salary = "";
            $scope.location = "";
        };
        })

        .controller("searchController", function ($scope, $rootScope) {
        $scope.getData = function () {
            var searchJson = { location: $scope.location };
            var jsonObj = JSON.stringify(searchJson);
            fetch("http://localhost:3000/search", {
            method: "POST",
            body: jsonObj,
            headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                $scope.datas = json;
            })
            .catch((err) => console.log(err));
        };
        })

        .controller("deleteController", function ($scope, $http) {
        $http.get("http://localhost:3000/").then(function (response) {
            $scope.datas = response.data;
        });
        $scope.deleteEntry = function () {
            var delJson = { delID: $scope.del.id };
            var jsonObj = JSON.stringify(delJson);

            fetch("http://localhost:3000/delete", {
            method: "POST",
            body: jsonObj,
            headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
            $scope.del = "";
        };
        })

        .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
            templateUrl: "view.html",
            })
            .when("/create", {
            templateUrl: "create.html",
            controller: "createController",
            })
            .when("/update", {
            templateUrl: "update.html",
            controller: "updateController",
            })
            .when("/search", {
            templateUrl: "search.html",
            controller: "searchController",
            })
            .when("/delete", {
            templateUrl: "delete.html",
            controller: "deleteController",
            });
        })
        .config(["$locationProvider", function ($locationProvider) {
            $locationProvider.hashPrefix("");
        },
        ]);
})();
