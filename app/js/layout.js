define(['jquery'], function ($) {

  'use strict';

  $(document).ready(function(){
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });
  });

});
