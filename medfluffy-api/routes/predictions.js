var express = require('express');
var router = express.Router();
var controller = require('../controllers/Predictions');
/* GET home page. */
router.get('/', async (req, res) => {
    res.json({message: "ini halaman detail prediction"})
});
router.post('/add', controller.add);
router.get('/show', controller.showAll);
router.get('/show/:id', controller.showOne);

module.exports = router;
