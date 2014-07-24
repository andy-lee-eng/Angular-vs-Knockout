'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
    beforeEach(module('testSPA.filters'));

    describe('custom date', function() {
        it('should format a date as text', inject(function(customDateFilter) {
            expect(customDateFilter('2012-06-10T00:00:00')).toEqual('10 June 2012');
        }));
    });

    describe('duration', function () {
        it('should format number to two decimal places', inject(function (durationFilter) {
            expect(durationFilter(5.678)).toEqual('5.68');
        }));
    });

    describe('custom currency', function () {
        it('should format number as currency with £ symbol', inject(function (customCurrencyFilter) {
            expect(customCurrencyFilter(5.678)).toEqual('£5.68');
        }));
    });

    describe('percent', function () {
        it('should format number as percentage with no decimal places', inject(function (percentFilter) {
            expect(percentFilter(0.5678)).toEqual('57%');
        }));
    });

});
