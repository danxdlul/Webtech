window.onload = function () {
    jQuery(document).ready(function () {
        $("#content").load("html/default.html");

        $("#frontpageButton").click(function () {
            $("#content").load("html/default.html");
        });

        $("#carButton").click(function () {
            $("#content").load("html/car.html",function () {
                initCars();
            });
        });

        $("#manufacturerButton").click(function () {
            $("#content").load("html/manufacturer.html",function () {
                initManufacturers();
            });
        });
    });
}