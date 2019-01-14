module.exports = {
	index: (req, res, next) => {
		try {
			res.status(200).json({ msg: 'Requested index page' });
		} catch (error) {
			next('err', error);
		}
	}
};
