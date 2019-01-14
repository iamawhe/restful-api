const express = require('express'),
	router = express.Router();

//controller
const indexController = require('../controllers/indexCtlr');

//router
router.route('/').get(indexController.index);

module.exports = router;
