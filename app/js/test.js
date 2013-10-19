// Test the installation
$(document).ready(function(){

  // Checking the api
  console.log('checking the api');
  $.getJSON('/api/v1', function(data){
    console.log('got a response from the api', data);
  });

  // Checking the websockets

  // Change host/port here to your own Web Socket server.
  ws = new WebSocket("ws://localhost:3000/ws");

  // Set event handlers.
  ws.onopen = function() {
    console.log("onopen");
    var msg = "coucou";
    ws.send(msg);
  };
  ws.onmessage = function(e) {
    // e.data contains received string.
    console.log("onmessage: " + e.data);
  };
  ws.onclose = function() {
    console.log("onclose");
  };
  ws.onerror = function() {
    console.log("onerror");
  };

});