var express = require('express');
var router = express.Router();
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
  const title = 'MedFluffy API';
  const description = 'Welcome to documentation page for MedFluffy API with database: '+ process.env.DB_NAME;
  res.render("index", { title, description});
});

module.exports = router;
