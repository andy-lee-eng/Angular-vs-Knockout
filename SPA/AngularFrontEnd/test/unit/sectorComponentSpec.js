'use strict';

describe('sector-component', function () {
    var controller, scope, backEndServer;

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('testSPA.sectorComponent'));

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, $q) {
        backEndServer = {
            data: {}, done: false, isDone: function () { return backEndServer.done; },
            getSectors: jasmine.createSpy().andCallFake(function (params) {
                return {
                    then: function (fn) {
                        setTimeout(function () { fn(backEndServer.data); backEndServer.done = true; }, 10);
                    }
                };
            })
        };

        scope = $rootScope.$new();
        scope.search = { name: '', json: function () { return { name: scope.search.name }; } };
        controller = $controller('SectorComponentCtrl', { $scope: scope, backEndServer: backEndServer });
    }));

    it('should initialise and load full sector list', function () {
        runs(function () {
            backEndServer.data = [{ name: 'sector-1' }];
            expect(scope.sectors).toBeUndefined();
            scope.$digest();
        });

        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(scope.sectors).toEqualData([{ name: 'sector-1' }]);
        });
    });

    it('should query filtered sector list when search changes', function (done) {
        runs(function () {
            backEndServer.data = [{ name: 'filtered-1' }];
            expect(scope.sectors).toBeUndefined();

            scope.search.name = 'test-filter';
            scope.$digest();
        });

        waitsFor(backEndServer.isDone, "Server call should be complete", 20);

        runs(function () {
            expect(backEndServer.getSectors).toHaveBeenCalledWith({ name: 'test-filter' });
            expect(scope.sectors).toEqualData([{ name: 'filtered-1' }]);
        });
    });

});
