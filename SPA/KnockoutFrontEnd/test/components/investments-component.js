define(['jquery', 'knockout', 'components/investments-component/investments-component', 'jquery-mockjax'], function ($, ko, investmentsComponent) {
    var InvestmentsComponentViewModel = investmentsComponent.viewModel;

    beforeEach(function () {
        $.mockjax({
            url: 'http://localhost:54361/analysis', data: { name: '' },
            responseTime: 10, responseText: [{ name: "investment-1" }]
        });
    });
    afterEach(function () {
        $.mockjaxClear();
    });

    describe('investments component view model', function () {
        it('should initialise and load full investments list', function (done) {
            // act
            var instance = new InvestmentsComponentViewModel({ search: { json: ko.observable() } });

            // assert
            setTimeout(function () { 
                expect(instance.investments()).toEqual([{ name: "investment-1" }]);
                done();
            }, 20);
        });

        it('should query filtered investment list when search changes', function (done) {
            // arrange
            $.mockjax({
                url: 'http://localhost:54361/analysis', data: { name: 'test-filter' },
                responseTime: 10, responseText: [{ name: "filtered-1" }]
            });

            var search = { json: ko.observable() };
            var instance = new InvestmentsComponentViewModel({ search: search });

            setTimeout(function () {
                // Initial loaded list
                expect(instance.investments()).toEqual([{ name: "investment-1" }]);

                // act
                search.json({ name: 'test-filter' });

                setTimeout(function () {
                    expect(instance.investments()).toEqual([{ name: "filtered-1" }]);
                    done();
                }, 20);
            }, 20);
        });

        it('showInvestment should navigate to investment page', function () {
            // arrange
            var instance = new InvestmentsComponentViewModel({ search: { json: ko.observable() } });

            // act
            instance.showInvestment.call({ id: 23 });

            // assert
            expect(location.hash).toEqual("#investment/23");
        });
    });

});
