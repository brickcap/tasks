var twit = require("twit");
var _ = require("_");

var twitter = new twit({
    consumer_key:         'ucGZ3YXP7H6zvSUhl2C92u4CO',
    consumer_secret:      'x3kaxss7QcfU2AaJT9aU2G94ks8s3RJhpBbdu09FhU3HOzTWI5',
    access_token:         '580679352-uMMRMxjep9gxBLmsWQDlHqP8ozXel58aFPlfgv8W',
    access_token_secret:  'tzDaEuXmb6lF3wATKJdbNnjMM3UC1JBWZrgz1Ly36YIdm'
});

exports.agg = function(res,wss){
    twitter.get("/lists/statuses",
		{slug:"mailer",owner_screen_name:"brickcap",per_page:50},
		function(error,data,response){
		    console.log(error);
		    console.log(data);
		    if(res)return res.send(data);
		    if(wss){
		    };
		    return null;
		});
    
};
