const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	img: String,
	preferredname: String,
	accomplishment: [String],
	favoritePerson: [String],
	

	//allows to see user-specific logs
	logs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Log'
	}],

	//allows to see user-specific techniques
	techniques: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Technique'
	}],


})



module.exports = mongoose.model('User', userSchema)