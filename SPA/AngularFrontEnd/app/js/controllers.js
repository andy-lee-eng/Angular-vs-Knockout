'use strict';

/* Controllers */

angular.module('testSPA.controllers', [])
  .controller('HomeCtrl', ['$scope', 'searchModel', function ($scope, searchModel) {
      $scope.search = searchModel;
  }])
  .controller('AboutCtrl', ['$scope', function($scope) {

  }]);
