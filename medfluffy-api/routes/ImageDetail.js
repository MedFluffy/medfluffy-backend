var express = require('express');
var controller = require('../controllers/ImageDetail');
var router = express.Router();
const validator = require('fastest-validator');
const v = new validator();

router.get('/', async (req, res) => {
    res.json({message: "ini halaman detail image"})
});
router.post('/add', controller.add);
router.get('/show', controller.showAll);
router.get('/show/:id', controller.showOne);

module.exports = router;
