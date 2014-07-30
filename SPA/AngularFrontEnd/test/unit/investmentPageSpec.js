'use strict';

describe('investment-page', function () {
    var controller, scope, backEndServer;

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('testSPA.investmentPage'));

    beforeEach(inject(function ($rootScope, $controller) {
        backEndServer = {
            data: {}, done: false, isDone: function () { return backEndServer.done; },
            getInvestment: jasmine.createSpy().andCallFake(function (params) {
                return {
                    then: function (fn) {
                        setTimeout(function () { fn(backEndServer.data); backEndServer.done = true; }, 10);
                    }
                };
            })
        };

        scope = $rootScope.$new();
        scope.search = { name: '', json: function () { return { name: scope.search.name }; } };
        controller = $controller('InvestmentPageCtrl', { $scope: scope, $routeParams: { id: 23 }, backEndServer: backEndServer });
    }));

    it('should initialise and load full investments list', function () {
        runs(function () {
            backEndServer.data = {
                name: "investment-1", sector: "test-sector",
                transactions: [{ amount: 1 }, { amount: 2 }],
                analysis: { returnOnInvestment: 32.5, open: true }
            };
            expect(scope.name).toBeUndefined();
        });

        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(backEndServer.getInvestment).toHaveBeenCalledWith({ id: 23 });

            expect(scope.name).toEqual('investment-1');
            expect(scope.sector).toEqual('test-sector');
            expect(scope.transactions).toEqual([{ amount: 1 }, { amount: 2 }]);
            expect(scope.returnOnInvestment).toEqual(32.5);
            expect(scope.open).toBe(true);
        });
    });

});
