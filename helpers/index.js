const { validateParam, validateBody, schema } = require('./routeValidator');

module.exports = {
	/* /users */
	userId: validateParam('userId', schema.idSchema),
	postUser: validateBody(schema.newUserSchema),
	putUser: validateBody(schema.newUserSchema),
	patchUser: validateBody(schema.newUserOptionalSchema),
	carPost: validateBody(schema.newCarUserSchema),
	/* /cars */
	postCar: validateBody(schema.newCarSchema),
	carId: validateParam('carId', schema.idSchema),
	putCar: validateBody(schema.putCarSchema),
	patchCar: validateBody(schema.patchCarSchema)
};
