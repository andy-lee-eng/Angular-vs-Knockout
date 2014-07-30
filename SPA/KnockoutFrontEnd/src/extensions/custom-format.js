define(["knockout", 'globalize', 'globalize-en'], function (ko, Globalize) {
    Globalize.culture("en-GB");

    // Format date using Globalize library
    ko.bindingHandlers.date = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            $(element).text(Globalize.format(new Date(Date.parse(value)), 'D'));
        }
    };

    ko.bindingHandlers.duration = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            $(element).text(Globalize.format(value, 'N2'));
        }
    };

    ko.bindingHandlers.currency = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            $(element).text(Globalize.format(value, 'C'));
        }
    };

    ko.bindingHandlers.percent = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            $(element).text(Globalize.format(parseFloat(value) * 100, 'N0') + '%');
        }
    };

});
