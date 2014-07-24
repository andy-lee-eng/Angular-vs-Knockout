define(['jquery', 'knockout', 'components/transactions-component/transactions-component', 'jquery-mockjax'], function ($, ko, transactionsComponent) {
    var TransactionsComponentViewModel = transactionsComponent.viewModel;

    beforeEach(function () {
        $.mockjax({
            url: 'http://localhost:54361/getTransactions', data: { name: '' },
            responseTime: 10, responseText: [{ name: "trans-1" }]
        });
    });
    afterEach(function () {
        $.mockjaxClear();
    });

    describe('transactions component view model', function () {
        it('should initialise and load full transactions list', function (done) {
            // act
            var instance = new TransactionsComponentViewModel({ search: { json: ko.observable() } });

            // assert
            setTimeout(function () {
                expect(instance.transactions()).toEqual([{ name: "trans-1" }]);
                done();
            }, 20);
        });

        it('should query filtered transaction list when search changes', function (done) {
            // arrange
            $.mockjax({
                url: 'http://localhost:54361/getTransactions', data: { name: 'test-filter' },
                responseTime: 10, responseText: [{ name: "filtered-1" }]
            });

            var search = { json: ko.observable() };
            var instance = new TransactionsComponentViewModel({ search: search });

            setTimeout(function () {
                // Initial loaded list
                expect(instance.transactions()).toEqual([{ name: "trans-1" }]);

                // act
                search.json({ name: 'test-filter' });

                setTimeout(function () {
                    expect(instance.transactions()).toEqual([{ name: "filtered-1" }]);
                    done();
                }, 20);
            }, 20);
        });
    });

});
