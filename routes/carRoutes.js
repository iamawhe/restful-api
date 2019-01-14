const express = require('express'),
	router = express.Router(),
	carsController = require('../controllers/carsCtlr'),
	usersController = require('../controllers/usersCtlr'),
	validateObj = require('../helpers');

/*  */

//router

//GET /cars/
router
	.route('/')
	.get(carsController.index)
	.post(validateObj.postCar, carsController.newCar);

//GET /cars/:user
router
	.route('/:carId')
	.get(validateObj.carId, carsController.getCar)
	.put(
		[validateObj.carId, validateObj.putCar],
		carsController.updateAllFieldsCar
	)
	.patch(
		[validateObj.carId, validateObj.patchCar],
		carsController.updateOptionalFieldsCar
	)
	.delete(validateObj.carId, carsController.deleteCar);

module.exports = router;
