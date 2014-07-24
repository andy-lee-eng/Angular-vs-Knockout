'use strict';

angular.module('testSPA.investmentsComponent', [])
    .directive('investmentsComponent', function () {
        return {
            restrict: 'E',
            scope: {
                search: '='
            },
            templateUrl: 'partials/investments-component.html',
            controller: 'InvestmentsComponentCtrl'
        };
    })
    .controller('InvestmentsComponentCtrl', ['$scope', 'backEndServer', function ($scope, backEndServer) {
        $scope.$watch('search.name', function () {
            backEndServer.analysis($scope.search.json()).then(function (data) {
                $scope.investments = data;
            });
        });

        $scope.showInvestment = function () {
            location.hash = '/investment/' + this.investment.id;
        };

    }]);
