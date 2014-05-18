var express = require('express');
var router = express.Router();
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var api = new MailChimpAPI("ece3870fa9da75a4b5025934029d7d24-us5", { version : '2.0' });


/* GET users listing. */
router.post('/', function(req, res) {
    var body = req.body;
    return  api.call('campaigns', 'create', { options:{
	list_id:"e1e798fb62",
	subject:"The selected twitter feed",
	from_email:"akshatjiwan@gmail.com",
	from_name:"Akshat Jiwan Sharmar",
	to_name:"Sundar"
	
    },content:{html:body.html},type:"regular"}, function (error, data) {
	if (error) return res.send(500);
	
      return  api.call("campaigns","list",function(error,data){
		if(error)return res.send(500);
		var id = data.data[0].id;
	  return api.call("campaigns","send",{cid:id},function(error,data){
	      console.log(error);
	      if(error)return res.send(404);
	      return res.send(200);
	  });
	    });	
    });
});

module.exports = router;
