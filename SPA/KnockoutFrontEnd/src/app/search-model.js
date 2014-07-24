define(['knockout'], function (ko) {
    function SearchModel() {
        this.name = ko.observable('');

        this.json = ko.computed(function () {
            return {
                name: this.name()
            };
        }, this).extend({ rateLimit: 500 });
    };

    return new SearchModel();
});
