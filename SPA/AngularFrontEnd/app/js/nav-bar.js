'use strict';

angular.module('testSPA.navBar', [])
    .directive('navBar', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/nav-bar.html',
            controller: 'RouteCtrl'
        };
    })
    .controller('RouteCtrl', ['$scope', '$route', '$location', function ($scope, $route, $location) {
        $scope.$on("$routeChangeSuccess", function (event, current, previous) {
            $scope.controller = $route.current.controller;
        });
    }]);
