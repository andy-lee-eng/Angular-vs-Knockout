define(['knockout', 'text!./transactions-component.html', 'extensions/charts'], function (ko, templateMarkup) {

    function TransactionsComponent(params) {
        this.transactions = ko.observableArray();

        var getTransactions = function () {
            $.getJSON('http://localhost:54361/getTransactions', params.search.json(), this.transactions);
        };

        getTransactions.call(this);
        var subscription = params.search.json.subscribe(getTransactions, this);
        this.dispose = function () { subscription.dispose(); };

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

    return { viewModel: TransactionsComponent, template: templateMarkup };

});
