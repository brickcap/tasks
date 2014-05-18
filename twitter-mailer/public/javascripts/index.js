var mailList = [];
var getMailList = function(check){
    var button = $("#mail");
    var parent = check.parentNode;
    var item = parent.textContent||parent.innerText;
    var length = mailList.length;
    if(!check.checked){
	mailList.splice(mailList.indexOf(item),1);
	parent.style["background-color"]="";
	return;
    }
    if(length===50) {
	check.checked=false;
	alert("You can only select 50 items");	
	return;
    }; 
    if(check.checked&&length<=50){
	mailList.push(item);
	parent.style["background-color"]="whitesmoke";
	button.removeAttr("disabled");
	return;
    }
    if(length===0)button.attr("disabled");
   
};

function mail(button){
    if(mailList.length===0){
	alert("No items in the list");
	button.disabled="disabled";
	
    }
    var mailString = mailList.join("<br/>");
    $.post("/send",{html:mailString}).done(function(){
	mailList = [];
	alert("Mailed");
	$(":checkbox").prop("checked",false);
    }).fail(function(){
	button.removeAttribute("disabled");
    });
}
