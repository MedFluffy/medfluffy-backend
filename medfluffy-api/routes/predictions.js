var express = require('express');
var router = express.Router();
const validator = require('fastest-validator');
const v = new validator();
var controller = require('../controllers/Predictions');
/* GET home page. */
router.get('/', async (req, res) => {
    res.json({message: "ini halaman detail prediction"})
});
router.post('/add', async (req, res) => {
    res.json({message: "ini endpoint tambah foto"});
});
router.get('/show', controller.showAll);
router.get('/show/:id', controller.showOne);

module.exports = router;
