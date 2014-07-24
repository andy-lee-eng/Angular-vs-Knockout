'use strict';

angular.module('testSPA.investmentPage', [])
  .controller('InvestmentPageCtrl', ['$scope', '$routeParams', 'backEndServer', function ($scope, $routeParams, backEndServer) {
      $scope.message = "Investment " + $routeParams.id;

      backEndServer.getInvestment({ id: $routeParams.id }).then(function (data) {
          $scope.name = data.name;
          $scope.sector = data.sector;
          $scope.transactions = data.transactions;
          $scope.returnOnInvestment = data.analysis.returnOnInvestment;
          $scope.open = data.analysis.open;
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
