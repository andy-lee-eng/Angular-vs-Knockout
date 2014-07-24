define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function ($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('investments-component', { require: 'components/investments-component/investments-component' });
  ko.components.register('investment-filter', { require: 'components/investment-filter/investment-filter' });
  ko.components.register('investment-page', { require: 'components/investment-page/investment-page' });
  ko.components.register('sector-component', { require: 'components/sector-component/sector-component' });
  ko.components.register('transactions-component', { require: 'components/transactions-component/transactions-component' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
