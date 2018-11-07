window.onload = function() {
  	jQuery(document).ready(function() {
        
        $("#content").load("static/main.html");

        $("#mainButton").click(function() {
            $("#content").load("static/main.html");;
        });

        $("#carButton").click(function() {
            $("#content").load("static/car.html", function(){
                initCars();            
            });
        });

        $("#manufacturerButton").click(function() {
            $("#content").load("static/manufacturer.html", function(){
                initManufacturers();            
            });
        });

	});
}
