'use strict';

angular.module('testSPA.transactionsComponent', [])
    .directive('transactionsComponent', function () {
        return {
            restrict: 'E',
            scope: {
                search: '='
            },
            templateUrl: 'partials/transactions-component.html',
            controller: 'TransactionsComponentCtrl'
        };
    })
    .controller('TransactionsComponentCtrl', ['$scope', 'backEndServer', function ($scope, backEndServer) {
        $scope.$watch('search.name', function () {
            backEndServer.getTransactions($scope.search.json()).then(function (data) {
                $scope.transactions = data;
            });
        });

        $scope.chartOptions = {
            x: 'date',
            y: 'amount',
            classFn: function (d) {
                return d.valuation ? "valuation"
                    : d.amount > 0 ? "invested"
                    : "returned";
            }
        };
    }]);
