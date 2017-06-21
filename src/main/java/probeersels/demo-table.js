function edit(element){
	var tr = jQuery(element).parent().parent();
	if(!tr.hasClass("editing")) {
		tr.addClass("editing");
		tr.find("DIV.td").each(function(){
			if(!jQuery(this).hasClass("action")){
				var value = jQuery(this).text();
				jQuery(this).text("");
				jQuery(this).append('<input type="text" value="'+value+'" />');
			} else {
				jQuery(this).find("BUTTON").text("save");
			}
		});
	} else {
		tr.removeClass("editing");
		tr.find("DIV.td").each(function(){
			if(!jQuery(this).hasClass("action")){
				var value = jQuery(this).find("INPUT").val();
				jQuery(this).text(value);
				jQuery(this).find("INPUT").remove();
			} else {
				jQuery(this).find("BUTTON").text("edit");
			}
		});
	}
}