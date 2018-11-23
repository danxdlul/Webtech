var manufacturerTemplate = `
    <table class="table">
    	<tr>
    		<td class="table-item"><h3>Name</h3><p>$(name)</p></td>
    		<td class="table-item"><h3>Country</h3><p>$(country)</p></td>
    		<td class="table-item"><h3>Founded</h3><p>$(founded)</p></td>
    	</tr>
    </table>
`;

function initManufacturers() {

    refresh();

    $('#manufacturerForm').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/addManufacturers',
            type:'post',
            data:$('#manufacturerForm').serialize(),
            success:function(){
                $("input[type=text], textarea").val("");
                refresh();
            },
            error: function(e) {
                alert("Manufacturer already exists");
            }
        });
    });
}


function refresh() {

    console.log("refreshing manufacturers");
    return $.get('/manufacturers', function(manufacturers) {
        console.log(manufacturers);
        $("#manufacturerTable").empty();
        for(var manufacturer of manufacturers) {
            console.log(manufacturer);
            $("#manufacturerTable").append(parseTemplate(manufacturerTemplate, manufacturer));
        }
    });

}