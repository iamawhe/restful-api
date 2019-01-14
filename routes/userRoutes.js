const express = require('express'),
	router = express.Router(),
	usersController = require('../controllers/usersCtlr'),
	validateObj = require('../helpers');

/*  */

//routers
router
	.route('/')
	.get(usersController.index)
	.post(validateObj.postUser, usersController.newUser);

//get user/id
router
	.route('/:userId')
	.get(validateObj.userId, usersController.getUser)
	.put(
		[validateObj.userId, validateObj.putUser],
		usersController.updateAllFieldUser
	)
	.patch(
		[validateObj.userId, validateObj.patchUser],
		usersController.updateOptionalFieldUser
	)
	.delete( validateObj.userId, usersController.deleteUser);

//:userId/cars
router
	.route('/:userId/cars')
	.get(validateObj.userId, usersController.getUserCars)
	.post([validateObj.userId, validateObj.carPost], usersController.newUserCar);

module.exports = router;
