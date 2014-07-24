'use strict';

/* jasmine specs for services go here */

describe('service', function() {
    beforeEach(module('testSPA.services'));

    describe('search model', function () {
        it('json should return filter json query', inject(function (searchModel) {
            searchModel.name = 'test-filter';

            expect(searchModel.json()).toEqual({ name: 'test-filter' });
        }));
    });
});
