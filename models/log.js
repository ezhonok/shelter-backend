const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
	beforeSleep: String,
	hoursSleep: Number,
	restedScale: Number,
	food: String,
	thought: String,
	alcohol: String,
	badSituation: String,
	badPerson: String,
	badPersonDescribed: String,
	selfCriticism: String,
	triedTechniques: String,
	talkedTo: String,
	goodPerson: String,
	goodPersonDescription: String,
	goodActivity: String,
	reflection: String,
	date: {type: Date, default: Date.now},

})



module.exports = mongoose.model('Log', logSchema)