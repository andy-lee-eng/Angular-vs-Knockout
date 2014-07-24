define(['knockout', 'text!./investment-page.html', 'extensions/custom-format', 'extensions/charts'], function (ko, templateMarkup) {

    function InvestmentPage(route) {
        var self = this;
        this.name = ko.observable('');
        this.sector = ko.observable('');
        this.transactions = ko.observableArray();

        this.returnOnInvestment = ko.observable(0);
        this.open = ko.observable(false);

        $.getJSON('http://localhost:54361/getInvestment', { id: route.id }, function (result) {
            self.name(result.name);
            self.sector(result.sector);
            self.transactions(result.transactions);

            self.returnOnInvestment(result.analysis.returnOnInvestment);
            self.open(result.analysis.open);
        }, this);

        this.chartOptions = {
            x: 'date',
            y: 'amount',
            classFn: function (d) {
                return d.valuation ? "valuation"
                    : d.amount > 0 ? "invested"
                    : "returned";
            }
        };

    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    InvestmentPage.prototype.dispose = function() { };
  
    return { viewModel: InvestmentPage, template: templateMarkup };

});
