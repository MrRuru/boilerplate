define(['angular'], function (angular) {
  'use strict';

  angular.module('myApp.services', [])
    .value('version', '0.1')
    .value('bets', [
      {
        id: "big-mac",
        money: 3,
        desc: "A big mac"
      },
      {
        id: "beer",
        money: 6,
        desc: "A beer"
      },
      {
        id: "cocktail",
        money: 12,
        desc: "A cocktail"
      },
      {
        id: "restaurant",
        money: 18,
        desc: "A restaurant"
      }      
    ])
    .factory('socket', function(){

      var service = {};
     
      service.connect = function() {
        if(service.ws) { return; }
     
        var ws = new WebSocket("ws://localhost:3000/ws");
     
        ws.onopen = function() {
          service.callback("Succeeded to open a connection");
        };
     
        ws.onerror = function() {
          service.callback("Failed to open a connection");
        }
     
        ws.onmessage = function(message) {
          service.callback(message.data);
        };
     
        service.ws = ws;
      }
     
      service.send = function(message) {
        service.ws.send(message);
      }
     
      service.subscribe = function(callback) {
        service.callback = callback;
      }
           
      return service;

    });
});