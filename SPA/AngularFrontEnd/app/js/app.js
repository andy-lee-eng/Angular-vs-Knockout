'use strict';


// Declare app level module which depends on filters, and services
angular.module('testSPA', [
  'ngRoute',
  'testSPA.filters',
  'testSPA.services',
  'testSPA.directives',
  'testSPA.controllers',
  'testSPA.navBar',
  'testSPA.investmentsComponent',
  'testSPA.sectorComponent',
  'testSPA.transactionsComponent',
  'testSPA.investmentFilter',
  'testSPA.investmentPage',
  'testSPA.mockServer'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home-page.html', controller: 'HomeCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about-page.html', controller: 'AboutCtrl'});
  $routeProvider.when('/investment/:id', { templateUrl: 'partials/investment-page.html', controller: 'InvestmentPageCtrl' });
  $routeProvider.otherwise({ redirectTo: '/home' });
}]);
