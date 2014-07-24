define(['jquery', 'knockout', 'components/sector-component/sector-component', 'jquery-mockjax'], function ($, ko, sectorComponent) {
    var SectorComponentViewModel = sectorComponent.viewModel;

    beforeEach(function () {
        $.mockjax({
            url: 'http://localhost:54361/getSectors', data: { name: '' },
            responseTime: 10, responseText: [{ name: "sector-1" }]
        });
    });
    afterEach(function () {
        $.mockjaxClear();
    });

    describe('sector component view model', function () {
        it('should initialise and load sectors', function (done) {
            // act
            var instance = new SectorComponentViewModel({ search: { json: ko.observable() } });

            // assert
            setTimeout(function () {
                expect(instance.sectors()).toEqual([{ name: "sector-1" }]);
                done();
            }, 20);
        });

        it('should query filtered sector list when search changes', function (done) {
            // arrange
            $.mockjax({
                url: 'http://localhost:54361/getSectors', data: { name: 'test-filter' },
                responseTime: 10, responseText: [{ name: "filtered-1" }]
            });

            var search = { json: ko.observable() };
            var instance = new SectorComponentViewModel({ search: search });

            setTimeout(function () {
                // Initial loaded list
                expect(instance.sectors()).toEqual([{ name: "sector-1" }]);

                // act
                search.json({ name: 'test-filter' });

                setTimeout(function () {
                    expect(instance.sectors()).toEqual([{ name: "filtered-1" }]);
                    done();
                }, 20);
            }, 20);
        });

    });

});
