define(['app/search-model'], function (searchModel) {

    describe('search model', function () {
        beforeEach(function () { searchModel.name(''); });

        it('json should return search json query', function () {
            searchModel.name('test-filter');

            expect(searchModel.json()).toEqual({ name: 'test-filter' });
        });

    });

});
