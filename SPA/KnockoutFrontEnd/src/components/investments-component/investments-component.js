define(["jquery", "knockout", "text!./investments-component.html", 'extensions/custom-format'], function ($, ko, templateMarkup) {

    function InvestmentsComponentViewModel(params) {
        this.investments = ko.observableArray();

        var getInvestments = function () {
            $.getJSON('http://localhost:54361/analysis', params.search.json(), this.investments);
        };

        getInvestments.call(this);
        var subscription = params.search.json.subscribe(getInvestments, this);
        this.dispose = function () { subscription.dispose(); };

        this.showInvestment = function () {
            location.hash = 'investment/' + this.id;
        };
    }

    return { viewModel: InvestmentsComponentViewModel, template: templateMarkup };

});
