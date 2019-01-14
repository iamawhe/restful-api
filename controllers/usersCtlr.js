const User = require('../models/User'),
	Car = require('../models/Car');

module.exports = {
	index: async (req, res, next) => {
		try {
			const user = await User.find({});
			res.status(200).json({ user });
		} catch (error) {
			next('err', error);
		}
	},
	newUser: async (req, res, next) => {
		const newUser = new User(req.value.body);

		try {
			const data = await newUser.save();
			res.status(200).json({ data });
		} catch (error) {
			next('err', error);
		}
	},
	getUser: async (req, res, next) => {
		const { userId } = req.value.params;

		try {
			const data = await User.findById(userId);
			res.status(200).json({ data });
		} catch (error) {
			next('err', error);
		}
	},
	updateAllFieldUser: async (req, res, next) => {
		//set validation to supply complete fields
		const { userId } = req.value.params;
		const updatedUser = req.value.body;
		try {
			const data = await User.findByIdAndUpdate(userId, updatedUser, {
				new: true
			});
			res.status(200).json({ data });
		} catch (error) {
			next('err', error);
		}
	},
	updateOptionalFieldUser: async (req, res, next) => {
		//set validation to any amount fields
		const { userId } = req.value.params;
		const updatedUser = req.value.body;
		try {
			const users = await User.findByIdAndUpdate(userId, updatedUser, {
				new: true
			});
			users.length !== 0
				? res.status(200).json({ users })
				: res.status(200).json({ users: 'Empty' });
		} catch (error) {
			next('err', error);
		}
	},
	getUserCars: async (req, res, next) => {
		const { userId } = req.value.params;
		const user = await User.findById(userId).populate('cars');

		res.status(200).json(user.cars);
	},
	newUserCar: async (req, res, next) => {
		try {
			const { userId } = req.value.params;

			//create new car
			const newCar = new Car(req.value.body);

			//get user for relation to car
			const user = await User.findById(userId);

			//set newCar seller to user obj
			newCar.seller = user;
			//save newCar
			await newCar.save();

			//push newCar to user obj
			user.cars.push(newCar);
			//save user
			await user.save();

			res.status(201).json({ newCar });
		} catch (error) {
			console.log('err', error);
		}
	},
	deleteUser: async (req, res, next) => {
		//set validation to any amount fields
		const { userId } = req.value.params;

		try {
			//get carId
			const user = await User.findById(userId);

			if (!user) {
				res.status(404).json({ error: 'User with ID does not exist!' });
			} else {
				//check if user has cars, delete cars
				if (user.cars.length !== 0) {
					await Car.deleteMany({ seller: user.id });
				}

				/* delete user */
				await user.delete();

				res.status(200).json({ Deleted: true });
			}
		} catch (error) {
			next('err', error);
		}
	}
};
