var twit = require("twit");
var _ = require("underscore");
var consolidate = require("consolidate");
var agg = {};
agg.tweets=[];
var previousAgg;
var twitter = new twit(
    {
	consumer_key:         '',
	consumer_secret:      '',
	access_token:         '',
	access_token_secret:  ''
    });

exports.agg = function(res,wss){
    var state = ["KaseyaCorp","hosted_kaseya","kaseya_backup","sundar_tweets" ];
    if(state.length>0)twitter_request(state.pop(),res,wss,state);
};

function twitter_request(name,res,wss,state){
    twitter.get("statuses/user_timeline",
		{screen_name:name,count:15},
		function(error,data,response){
		    if(error)console.log(error);
		    //check if the tweet for all the users has been aggregated
		    var state_length = state.length===0;
		    //get all the tweets from the unstructured data
		    if(data) agg.tweets.push(
			{
			    name:name,
			    items:_.map(data,
					function(item){
					    return{"text":item.text};
					})
			});
		    previousAgg =agg;
		    if(state_length && res)return res.render("index",agg);
		    if(state_length && wss){
			consolidate.mustache('views/partial.html',agg,function(error,template){
			    console.log(template);
			    return wss.send({html:template});
			});
			
		    };
		    return twitter_request(state.pop(),res,wss,state);
		    return agg;
		});

}
