'use strict';

angular.module('testSPA.investmentFilter', [])
    .directive('investmentFilter', function () {
        return {
            restrict: 'E',
            scope: {
                search: '='
            },
            templateUrl: 'partials/investment-filter.html',
            controller: 'InvestmentFilterCtrl'
        };
    })
    .controller('InvestmentFilterCtrl', ['$scope', function ($scope) {
        
    }]);
