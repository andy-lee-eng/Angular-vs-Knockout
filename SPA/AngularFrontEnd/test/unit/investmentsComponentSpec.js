'use strict';

describe('investments-component', function () {
    var controller, scope, backEndServer;

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('testSPA.investmentsComponent'));

    beforeEach(inject(function ($rootScope, $controller) {
        backEndServer = {
            data: {}, done: false, isDone: function () { return backEndServer.done; },
            analysis: jasmine.createSpy().andCallFake(function (params) {
                return {
                    then: function (fn) {
                        setTimeout(function () { fn(backEndServer.data); backEndServer.done = true; }, 10);
                    }
                };
            })
        };

        scope = $rootScope.$new();
        scope.search = { name: '', json: function () { return { name: scope.search.name }; } };
        controller = $controller('InvestmentsComponentCtrl', { $scope: scope, backEndServer: backEndServer });
    }));

    it('should initialise and load full investments list', function () {
        runs(function () {
            backEndServer.data = [{ name: 'investment-1' }];
            expect(scope.investments).toBeUndefined();
            scope.$digest();
        });
        
        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(scope.investments).toEqualData([{ name: 'investment-1' }]);
        });
    });

    it('should query filtered investment list when search changes', function (done) {
        runs(function () {
            backEndServer.data = [{ name: 'filtered-1' }];
            expect(scope.investments).toBeUndefined();

            scope.search.name = 'test-filter';
            scope.$digest();
        });

        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(backEndServer.analysis).toHaveBeenCalledWith({ name: 'test-filter' });
            expect(scope.investments).toEqualData([{ name: 'filtered-1' }]);
        });
    });

    it('showInvestment should navigate to investment page', function () {
        // act
        scope.showInvestment.call({ investment: { id: 23 } });

        // assert
        expect(location.hash).toEqual("#/investment/23");
    });

});
