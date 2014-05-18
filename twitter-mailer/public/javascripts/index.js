var mailList = [];
var getMailList = function(check){
    var parent = check.parentNode;
    var item = parent.textContent||parent.innerText;
    if(mailList.length>1)$("#mail").removeAttr("disabled");
    if(!check.checked){
	mailList.splice(mailList.indexOf(item),1);
	parent.style["background-color"]="";
	return;
    }
    if(mailList.length===50) {
	check.checked=false;
	console.log(mailList.length);
	alert("You can only select 50 items");	
	return;
    }; 
    if(check.checked){
	mailList.push(item);
	parent.style["background-color"]="whitesmoke";
	return;
    }
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
    }).fail(function(){
	button.removeAttribute("disabled");
    });
}
