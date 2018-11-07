var manufacturerTemplate = `
  <div class="box" style="display:none;">
    <table class="manufacturer-table">
    	<tr>
    		<td class="table-item"><h3>Name</h3><p>$(name)</p></td>
    		<td class="table-item"><h3>Country</h3><p>$(country)</p></td>
    		<td class="table-item"><h3>Founded</h3><p>$(founded)</p></td>
    	</tr>
    </table>
  </div>
`;


function initManufacturers() {
        
  		refresh();

		$('#manufacturerAddButton').click(function() {
            console.log("c");
			$('#manufacturerModal').css('display', 'block');
		});   

		$("#manufacturerClose").click(function() {
			$('#manufacturerModal').css('display', 'none');
		});

		$('#manufacturerForm').submit(function(e){
		    e.preventDefault();
		    $.ajax({
		        url:'/addManufacturers',
		        type:'post',
		        data:$('#manufacturerForm').serialize(),
		        success:function(){
		        	$('#manufacturerModal').css('display', 'none');
		        	$("input[type=text], textarea").val("");
		        	refresh();
		        },
                error: function(e) {
                    alert("The manufacturer name should be unique!");
                }
		    });
		});
}


function refresh() {

	console.log("refreshing manufacturers");
	return $.get('/manufacturers', function(manufacturers) {
		console.log(manufacturers);
		$("#manufacturerContainer").empty();
		//adding elements
		for(var manufacturer of manufacturers) {
			console.log(manufacturer);
			$("#manufacturerContainer").append(parseTemplate(manufacturerTemplate, manufacturer));
		}
		//displaying elements with animation
		var time = 500;
		($(".box")).each(function(index) {
			$(this).delay(200*index).fadeIn(400);
		});
	});

}
