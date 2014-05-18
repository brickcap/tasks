var mailList = [];
var socket = new WebSocket("ws://localhost:8080");
socket.onmessage = function(event){
    $("#main").html(event.data.html);
};

var getMailList = function(check){
    var button = $("#mail");
    var parent = check.parentNode;
    var item = parent.textContent||parent.innerText;
    var length = mailList.length;
    if(!check.checked){
	mailList.splice(mailList.indexOf(item),1);
	parent.style["background-color"]="";
	if(length===0)button.attr("disabled");
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
    button.disabled="disabled";
    if(mailList.length===0){	
	alert("No items in the list");
	
    }
    var mailString = mailList.join("<br/><br/>");
    $.post("/send",{html:mailString}).done(function(){
	mailList = [];
	$(":checkbox").prop("checked",false);
	button.removeAttribute("disabled");
	$("p").css('background-color','white');
    }).fail(function(){
	button.removeAttribute("disabled");
    });
}
setInterval(
    function(){
	socket.send({more:true});
    }, 900000);
