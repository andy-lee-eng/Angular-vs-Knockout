define(["knockout", 'extensions/custom-format'], function (ko) {

    describe('custom format', function () {
        var $element, element;
        beforeEach(function () {
            $element = $('<span></span>');
            element = $element.get(0);
        });

        describe('date', function () {
            it('should format a date as text', function () {
                // act
                ko.bindingHandlers.date.update(element, function () { return ko.observable('2012-06-10T00:00:00') });

                // assert
                expect($element.text()).toEqual('10 June 2012');
            });

        });

        describe('duration', function () {
            it('should format number to two decimal places', function () {
                // act
                ko.bindingHandlers.duration.update(element, function () { return ko.observable(5.678) });

                // assert
                expect($element.text()).toEqual('5.68');
            });

        });

        describe('currency', function () {
            it('should format number as currency with £ symbol', function () {
                // act
                ko.bindingHandlers.currency.update(element, function () { return ko.observable(5.678) });

                // assert
                expect($element.text()).toEqual('£5.68');
            });

        });

        describe('percent', function () {
            it('should format number as percentage with no decimal places', function () {
                // act
                ko.bindingHandlers.percent.update(element, function () { return ko.observable(0.5678) });

                // assert
                expect($element.text()).toEqual('57%');
            });

        });
    });
});
