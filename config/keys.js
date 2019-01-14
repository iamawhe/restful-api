/* check which creadential to return based on environment */

process.env.NODE_ENV === 'production'
	? (module.exports = require('./prod'))
	: (module.exports = require('./dev'));
