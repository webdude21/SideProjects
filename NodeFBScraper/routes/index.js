var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');


router.get('/', function (req, res) {
    res.render('index');
});

router.post('/', function (req, res) {
    mainController(req, res);
 });

module.exports = router;