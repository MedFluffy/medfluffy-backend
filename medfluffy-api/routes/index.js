var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = 'MedFluffy API';
  const description = 'Welcome to documentation page for MedFluffy API';
  res.render("index", { title, description});
});

module.exports = router;
