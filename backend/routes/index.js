var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors')

router.use(cors())
// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/home', function(req, res) {
  console.log("BODY", req.body);
  res.send(`{sample : "HAPPY SUCCESSFULL"}`)
});

module.exports = router;
