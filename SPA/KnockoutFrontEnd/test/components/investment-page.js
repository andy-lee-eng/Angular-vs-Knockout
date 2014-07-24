define(['jquery', 'knockout', 'components/investment-page/investment-page', 'jquery-mockjax'], function ($, ko, investmentPage) {
    var InvestmentPageViewModel = investmentPage.viewModel;

    var investmentData = {
        name: "investment-1", sector: "test-sector",
        transactions: [{ amount: 1 }, { amount: 2 }],
        analysis: { returnOnInvestment: 32.5, open: true }
    };

    beforeEach(function () {
        $.mockjax({
            url: 'http://localhost:54361/getInvestment', data: { id: 23 },
            responseTime: 10, responseText: investmentData
        });
    });
    afterEach(function () {
        $.mockjaxClear();
    });

    describe('investment page view model', function () {
        it('should initialise and load investment details', function (done) {
            // act
            var instance = new InvestmentPageViewModel({ id: 23 });

            // assert
            setTimeout(function () {
                expect(instance.name()).toEqual("investment-1");
                expect(instance.sector()).toEqual("test-sector");

                expect(instance.transactions()).toEqual([{ amount: 1 }, { amount: 2 }]);
                expect(instance.returnOnInvestment()).toEqual(32.5);
                expect(instance.open()).toBe(true);
                done();
            }, 20);
        });

    });

});
