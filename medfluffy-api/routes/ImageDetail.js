var express = require('express');
var controller = require('../controllers/ImageDetail');
var router = express.Router();
const validator = require('fastest-validator');
const v = new validator();

router.get('/', async (req, res) => {
    res.json({message: "ini halaman detail image"})
});
router.post('/add', async (req, res) => {
    res.json({message: "ini endpoint tambah foto"});
});
router.get('/show', controller.showAll );
router.get('/show/:id', async (req, res) => {
    const id = req.params.id;
    res.json({message: "ini endpoint tampil image ${id}"});
});

module.exports = router;
