const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
	eventName   : String,
	location    : String,
	eventDate   : [ { date: Date, price: Number } ],
	resume      : String,
	image       : String,
	outstanding : Boolean
});

eventSchema.set('toJSON', {
	transform : (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Event = model('Event', eventSchema);

module.exports = Event;
