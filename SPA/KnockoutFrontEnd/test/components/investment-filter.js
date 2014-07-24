define(['components/investment-filter/investment-filter', 'app/search-model'], function (investmentFilter, searchModel) {
    var InvestmentFilterViewModel = investmentFilter.viewModel;

    describe('investment filter view model', function () {
        beforeEach(function () { searchModel.name(''); });

        it('should store search model object', function () {
            var instance = new InvestmentFilterViewModel({ search: searchModel });

            expect(instance.search.name()).toEqual('');

            // Change the filter name
            searchModel.name('new-filter');
            expect(instance.search.name()).toEqual('new-filter');
        });

    });

});
