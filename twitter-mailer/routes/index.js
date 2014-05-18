var express = require('express');
var router = express.Router();
var agg = require("../aggregate-tweets");

/* GET home page. */
router.get('/', function(req, res) {
    return r
  res.render('index', { title: 'Express' });
});

module.exports = router;
