const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const carSchema = new Schema({
	make: String,
	model: String,
	yearManufactured: String,
	seller: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('Car', carSchema);
