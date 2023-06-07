var express = require('express');
var router = express.Router();
const validator = require('fastest-validator');
const v = new validator();
const { model_image } = require('../models/images')
/* GET home page. */
router.get('/', async (req, res) => {
    res.json({message: "ini halaman detail prediction"})
});
router.post('/add', async (req, res) => {
    res.json({message: "ini endpoint tambah foto"});
});
router.get('/show', async (req, res) => {
    res.json({message: "ini endpoint tampil image"})
});
router.get('/show/:id', async (req, res) => {
    const id = req.params.id;
    res.json({message: "ini endpoint tampil image ${id}"});
});

module.exports = router;
