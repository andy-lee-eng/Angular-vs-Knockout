define(['knockout', 'text!./sector-component.html', 'extensions/charts'], function (ko, templateMarkup) {

  function SectorComponent(params) {
      this.sectors = ko.observableArray();

      var getSectors = function () {
          $.getJSON('http://localhost:54361/getSectors', params.search.json(), this.sectors);
      };

      getSectors.call(this);
      var subscription = params.search.json.subscribe(getSectors, this);
      this.dispose = function () { subscription.dispose(); };
  }

  return { viewModel: SectorComponent, template: templateMarkup };

});
