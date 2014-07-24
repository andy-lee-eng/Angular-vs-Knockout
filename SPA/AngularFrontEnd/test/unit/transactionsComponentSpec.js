'use strict';

describe('transactions-component', function () {
    var controller, scope, backEndServer;

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('testSPA.transactionsComponent'));

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, $q) {
        backEndServer = {
            data: {}, done: false, isDone: function () { return backEndServer.done; },
            getTransactions: jasmine.createSpy().andCallFake(function (params) {
                return {
                    then: function (fn) {
                        setTimeout(function () { fn(backEndServer.data); backEndServer.done = true; }, 10);
                    }
                };
            })
        };

        scope = $rootScope.$new();
        scope.search = { name: '', json: function () { return { name: scope.search.name }; } };
        controller = $controller('TransactionsComponentCtrl', { $scope: scope, backEndServer: backEndServer });
    }));

    it('should initialise and load full transactions list', function () {
        runs(function () {
            backEndServer.data = [{ name: 'trans-1' }];
            expect(scope.transactions).toBeUndefined();
            scope.$digest();
        });

        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(scope.transactions).toEqualData([{ name: 'trans-1' }]);
        });
    });

    it('should query filtered transaction list when search changes', function (done) {
        runs(function () {
            backEndServer.data = [{ name: 'filtered-1' }];
            expect(scope.transactions).toBeUndefined();

            scope.search.name = 'test-filter';
            scope.$digest();
        });

        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(backEndServer.getTransactions).toHaveBeenCalledWith({ name: 'test-filter' });
            expect(scope.transactions).toEqualData([{ name: 'filtered-1' }]);
        });
    });

});
