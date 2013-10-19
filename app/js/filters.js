define(['angular', 'services'], function (angular, services) {
  'use strict';

  angular.module('myApp.filters', ['myApp.services'])
    .filter('interpolate', ['version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }])

    .filter('toEuro', ['version', function(version) {
      return function(text) {
        return text + " €";
      };
    }]);
});