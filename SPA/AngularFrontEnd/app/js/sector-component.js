'use strict';

angular.module('testSPA.sectorComponent', [])
    .directive('sectorComponent', function () {
        return {
            restrict: 'E',
            scope: {
                search: '='
            },
            templateUrl: 'partials/sector-component.html',
            controller: 'SectorComponentCtrl'
        };
    })
    .controller('SectorComponentCtrl', ['$scope', 'backEndServer', function ($scope, backEndServer) {
        $scope.$watch('search.name', function () {
            backEndServer.getSectors($scope.search.json()).then(function (data) {
                $scope.sectors = data;
            });
        });

        $scope.chartOptions = { series: ['investedAmount', 'returnAmount'] };
    }]);
