var twit = require("twit");
var _ = require("underscore");
var agg = {};
var state = ["KaseyaCorp","@hosted_kaseya","@kaseya_backup","KaseyaUK","sundar_tweets" ];
var twitter = new twit(
    {
	consumer_key:         'ucGZ3YXP7H6zvSUhl2C92u4CO',
	consumer_secret:      'x3kaxss7QcfU2AaJT9aU2G94ks8s3RJhpBbdu09FhU3HOzTWI5',
	access_token:         '580679352-uMMRMxjep9gxBLmsWQDlHqP8ozXel58aFPlfgv8W',
	access_token_secret:  'tzDaEuXmb6lF3wATKJdbNnjMM3UC1JBWZrgz1Ly36YIdm'
    });

exports.agg = function(res,wss){
    var name = state.pop();
};

function twitter_request(name,res,wss){
    twitter.get("statuses/user_timeline",
		{screen_name:"KaseyaCorp",count:10},
		function(error,data,response){
		    //check if the tweet for all the users have been aggregated
		    var state_length = state.length===0;
		    //get all the tweets from the unstructured data
		    if(data) agg.data.name = _.pluck(data,"text");
		    
		    if(state_length)return res.send(data);
		    if(state_length)return res.send(data);
		    twitter_request(state.pop(),res,wss);
		    return agg;
		});

}
