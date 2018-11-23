var carTemplate = `
    <table class="carTable" onclick="getManufacturer('$(manufacturer)')">
    <tr><p class="carName" onclick="getManufacturer('$(manufacturer)')">$(name)</p></tr>
        <tr>
    		<td class="table-item"><h3>Manufacturer</h3><p>$(manufacturer)</p></td>
    		<td class="table-item"><h3>Consumption</h3><p>$(consumption)</p></td>
    		<td class="table-item"><h3>Color</h3><p>$(color)</p></td>
    	</tr>
    	<tr>
    		<td class="table-item"><h3>Available</h3><p>$(available)</p></td>
    		<td class="table-item"><h3>Year</h3><p>$(year)</p></td>
    		<td class="table-item"><h3>Horsepower</h3><p>$(horsepower)</p></td>
    	</tr>
    </table>
    `;

var manufacturerNames =[];

function initCars() {

    refreshCars();
    $('#carForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url:'/addCar',
            type:'post',
            data:$('#carForm').serialize(),
            success:function () {
                $("input[type=text],textarea").val("");
                $("input[type=number],textarea").val("");
                refreshCars();
            },
            error: function (e) {
                alert("Car already exists.")
            }
        })
    })
}

function refreshCars() {

    $.get('/manufacturerNames', function(names) {
        console.log(names);
        manufacturerNames = names;
        var selection = '';
        for(var man of manufacturerNames) {
            selection += ('<option>' + man + "</option>");
        }
        $("#manufacturerSelector").empty();
        $('#manufacturerSelector').append(selection);
    });

    $.get('/cars', function(manufacturers) {
        console.log(manufacturers);
        $("#carTable").empty();
        for(var manufacturer of manufacturers) {
            console.log(manufacturer);
            $("#carTable").append(parseTemplate(carTemplate, manufacturer));
        }
    });

}
function parseTemplate(template, obj) {
    var newTemplate = template;
    for(var key in obj) {
        var occurrences = template.split(key).length;
        for (var i = 0; i < occurrences; i++) {
            newTemplate = newTemplate.replace("$("+ key +")", obj[key]);
        }
    }
    return newTemplate;
}

function getManufacturer(name) {
    document.cookie = "name=" + name;
    $.ajax({
        url: '/manufacturer',
        type: 'get',
        success: function(data) {
            refreshCarList(data);
        },
        error: function(e) {
            alert("There was an error while loading cars!");
        }
    });

}

function refreshCarList(data) {
    $("#carTable").empty();
    for(var car of data) {
        console.log(car);
        $('#carTable').append(parseTemplate(carTemplate,car));
    }


}