var express = require('express');
var router = express.Router();
var tweet = require("../aggregate_tweets");

/* GET home page. */
router.get('/', function(req, res) {
    return res.render("index");
});

module.exports = router;
