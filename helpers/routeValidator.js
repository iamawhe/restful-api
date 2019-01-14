const Joi = require('joi');

module.exports = {
	validateParam: (field, schema) => {
		return (req, res, next) => {
			const result = Joi.validate({ param: req['params'][field] }, schema);

			if (result.error) {
				return res.status(400).json(result.error);
			} else {
				//modify req obj with result.value
				if (!req.value) req.value = {};
				if (!req.value['params']) req.value['params'] = {};

				req.value['params'][field] = result.value.param;
				next();
			}
		};
	},
	validateBody: schema => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema);

			if (result.error) return res.status(400).json(result.error);

			//modify req.body
			if (!req.value) req.value = {};
			if (!req.value['body']) req.value['body'] = {};

			//assign result.value to req.value['body'] obj
			req.value['body'] = result.value;
			next();
		};
	},
	schema: {
		idSchema: Joi.object().keys({
			param: Joi.string()
				.regex(/^[a-zA-Z0-9]{24}$/)
				.required()
		}),
		newUserSchema: Joi.object().keys({
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			email: Joi.string()
				.email({ minDomainAtoms: 2 })
				.required()
		}),
		newUserOptionalSchema: Joi.object().keys({
			firstName: Joi.string(),
			lastName: Joi.string(),
			email: Joi.string().email({ minDomainAtoms: 2 })
		}),
		newCarUserSchema: Joi.object().keys({
			make: Joi.string().required(),
			model: Joi.string().required(),
			yearManufactured: Joi.number().required()
		}),
		/* /cars */
		newCarSchema: Joi.object().keys({
			seller: Joi.string()
				.regex(/^[a-zA-Z0-9]{24}$/)
				.required(),
			make: Joi.string().required(),
			model: Joi.string().required(),
			yearManufactured: Joi.number().required()
		}),
		putCarSchema: Joi.object().keys({
			make: Joi.string().required(),
			model: Joi.string().required(),
			yearManufactured: Joi.number().required()
		}),
		patchCarSchema: Joi.object().keys({
			make: Joi.string(),
			model: Joi.string(),
			yearManufactured: Joi.number()
		})
	}
};
