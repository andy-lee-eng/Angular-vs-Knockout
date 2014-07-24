define(['knockout', 'text!./investment-filter.html'], function(ko, templateMarkup) {

  function InvestmentFilter(params) {
      this.search = params.search;
  }

  return { viewModel: InvestmentFilter, template: templateMarkup };

});
