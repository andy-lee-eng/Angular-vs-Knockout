(function() {
  // Reference your test modules here
    var testModules = [
        'app/search-model',
        'components/home-page',
        'components/investment-filter',
        'components/investments-component',
        'components/sector-component',
        'components/transactions-component',
        'components/investment-page',
        'extensions/custom-format'
    ];

  // After the 'jasmine-boot' module creates the Jasmine environment, load all test modules then run them
  require(['jasmine-boot'], function () {
  	var modulesCorrectedPaths = testModules.map(function(m) { return '../test/' + m; });
    require(modulesCorrectedPaths, window.onload);
  });
})();
