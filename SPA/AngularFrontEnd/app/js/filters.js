'use strict';

/* Filters */
Globalize.culture('en-GB');

angular.module('testSPA.filters', [])
  .filter('customDate', ['dateFilter', function (dateFilter) {
      return function (text) {
          return Globalize.format(new Date(Date.parse(text)), 'D');
      };
  }])
  .filter('duration', function () {
      return function (text) {
          return Globalize.format(text, 'N2');
      };
  })
  .filter('customCurrency', function () {
      return function (text) {
          return Globalize.format(text, 'C');
      };
  })
  .filter('percent', function () {
    return function(text) {
        return Globalize.format(parseFloat(text) * 100, 'N0') + '%';
    };
  });
