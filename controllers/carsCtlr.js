const Car = require('../models/Car'),
	User = require('../models/User');

module.exports = {
	index: async (req, res, next) => {
		try {
			const carsList = await Car.find({});
			carsList.length === 0
				? res.status(200).json({ carsList: 'Empty' })
				: res.status(200).json({ carsList });
		} catch (error) {
			next('err', error);
		}
	},
	newCar: async (req, res, next) => {
		try {
			//find user by id
			const seller = await User.findById(req.value.body.seller);

			//create newCar and delete the seller prop
			const newCar = req.value.body;
			delete newCar.seller;

			const car = new Car(newCar);
			//assign seller
			car.seller = seller;
			await car.save();

			//push newCar to user (seller's)  arr
			seller.cars.push(car);
			await seller.save();

			res.status(201).json({ car });
		} catch (error) {
			next('err', error);
		}
	},
	getCar: async (req, res, next) => {
		try {
			const car = await Car.findById(req.value.params.carId);
			!car
				? res.status(200).json({ car: 'Empty' })
				: res.status(200).json({ car });
		} catch (error) {
			next('err', error);
		}
	},
	updateAllFieldsCar: async (req, res, next) => {
		//set validation to supply complete fields
		const { carId } = req.value.params;
		const updatedCar = req.value.body;
		try {
			const car = await Car.findByIdAndUpdate(carId, updatedCar, {
				new: true
			});
			res.status(200).json({ car });
		} catch (error) {
			next('err', error);
		}
	},
	updateOptionalFieldsCar: async (req, res, next) => {
		//set validation to any amount fields
		const { carId } = req.value.params;
		const updatedCar = req.value.body;
		try {
			const car = await Car.findByIdAndUpdate(carId, updatedCar, {
				new: true
			});
			car
				? res.status(200).json({ car })
				: res.status(200).json({ car: 'Empty' });
		} catch (error) {
			next('err', error);
		}
	},
	deleteCar: async (req, res, next) => {
		//set validation to any amount fields
		const { carId } = req.value.params;

		try {
			//get carId
			const car = await Car.findById(carId);

			if (!car) {
				res.status(404).json({ error: 'Car with ID does not exist!' });
			} else {
				//get sellerId
				const seller = await User.findById(car.seller);

				//remove car
				await car.delete();

				//remove car from seller' car array
				seller.cars.pull(car);
				await seller.save();

				res.status(200).json({ Deleted: true });
			}
		} catch (error) {
			next('err', error);
		}
	}
};
