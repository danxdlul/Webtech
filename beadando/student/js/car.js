var carsTemplate = `
  <div class="box" style="display:none;">
  	<h2>$(name)</h2>
    <table class="table">
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
  </div>
`;

var manufacturerNames = [];

function initCars() {

  		var modal = $('#modal');

  		refreshCars();

		$('#buttonAddCar').click(function() {
			$('#carModal').css('display', 'block');
		});

		$("#carClose").click(function() {
			$('#carModal').css('display', 'none');
		});

		$('#carForm').submit(function(e){
			console.log($('#form').serialize());
		    e.preventDefault();
		    $.ajax({
		        url:'/addCar',
		        type:'post',
		        data:$('#carForm').serialize(),
		        success:function(){
		        	$('#carModal').css('display', 'none');
		        	$("input[type=text], textarea").val("");
		        	$("input[type=number], textarea").val("");
		        	refreshCars();
		        },
                error: function(e) {
                    alert("The car name should be unique!");
                }
		    });
		});

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
		$("#carContainer").empty();
		//adding elements
		for(var manufacturer of manufacturers) {
			console.log(manufacturer);
			$("#carContainer").append(parseTemplate(carsTemplate, manufacturer));
		}
		//displaying elements with animation
		var time = 500;
		($(".box")).each(function(index) {
			$(this).delay(100*index).show(200);
		});
	});

}

function add() {

}
