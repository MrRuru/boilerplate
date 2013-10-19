// The JS app
require.config({

  baseUrl: "/js",

  paths:{
    jquery: "../components/jquery/jquery",
    angular: "../components/angular/angular",
    angularRoute: '../components/angular-route/angular-route',
    underscore: '../components/underscore/underscore'
  },

  shim: {
    'angular' : {'exports' : 'angular'},
    'angularRoute': ['angular'],
    'underscore' : {'exports' : '_'}
  },

  priority: [
    "angular"
  ]

});



// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";


require( [

  'angular',
  'app',
  'routes',
  'layout'

], function(angular, app, routes, layout) {

  'use strict';

  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    $html.addClass('ng-app');
    angular.bootstrap($html, [app['name']]);
  });

  console.log('app booted!');

});
