document.addEventListener("turbolinks:load", function() {
   $("#slider1").change(function () {
      	var newValue = $('#slider1').val();
      	$("#W1").html(newValue);
   });
});