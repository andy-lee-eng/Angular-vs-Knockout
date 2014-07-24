'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('testSPA.services', [])
  .service('searchModel', function SearchModel() {
      this.name = '';

      this.json = function () {
          return {
              name: this.name
          };
      };
  });
