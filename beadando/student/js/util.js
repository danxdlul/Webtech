

function parseTemplate(template, obj) {
	var newTemplate = template;
	for(var key in obj) {
		newTemplate = newTemplate.replace("$("+ key +")", obj[key]);
	}
	return newTemplate;
}