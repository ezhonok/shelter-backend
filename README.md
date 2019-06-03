Project summary:

This is an app that allows user to analyze their emotional state and build techniques to cope with difficult emotions.


User stories:
- User is able to log in/register/ log out
- User is able to create/edit/delete techniques that make them feel better emotionally
- User is able to create logs about their day (they are not able to edit/delete the logs)
- User is able to see broken down analysis of people/situations that made user upset
- User is provided with pre-set tips on how to help themselves


DATA MODELS:

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



const techniqueSchema = new mongoose.Schema({
	home: String,
	outside: String,
	anywhere: String 

})


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



