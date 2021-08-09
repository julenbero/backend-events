const server = require('express').Router();
const userExtractor = require('../middleware/userExtractor');

const Event = require('../models/Events');

const monthNames = [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec' ];

server.get('/', userExtractor, async (req, res) => {
	let events;
	const limit = 4;
	if (req.userId) {
		const page = req.query.pag && req.query.pag != '' ? req.query.pag : 1;
		events = await Event.find({})
			.limit(limit * 2)
			.skip((page - 1) * (limit * 2))
			.sort({ 'eventDate.date': 'DESC' });
	} else {
		events = await Event.find({}).limit(limit).sort({ 'eventDate.date': 'DESC' });
	}
	const outStandingEvents = await Event.find({ outstanding: true }).sort({ 'eventDate.date': 'DESC' });
	res.json({ events, outStandingEvents });
});

server.post('/', async (req, res) => {
	const { body } = req;
	const { eventName, location, datesEvent, resume, image, outstanding } = body;
	const newEvent = new Event({
		eventName,
		location,
		resume,
		image,
		outstanding : outstanding != null ? true : false
	});

	datesEvent.map((event) => {
		console.log(event);

		newEvent.eventDate.push({
			date  : event.date,
			price : event.price
		});
	});
	const event = await newEvent.save();
	res.json(event);
});

server.get('/:id', async (req, res) => {
	const { params } = req;
	const { id } = params;
	try {
		const findEvent = await Event.findById(id);
		if (findEvent) {
			res.json(findEvent);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		next(error);
	}
});

server.get('/twitter/:id', async (req, res) => {
	const { params } = req;
	const { id } = params;
	try {
		const findEvent = await Event.findById(id);
		const { eventDate } = findEvent;
		const link = req.protocol + '://' + req.get('host') + req.originalUrl.replace('twitter/', '');
		const { date } = eventDate[0];
		const message = `Iré al ${findEvent.eventName} @ ${monthNames[
			date.getMonth()
		]} ${date.getDay()} ${date.getHours()}:${date.getMinutes()} LINK DEL EVENTO ${link}`;
		res.send(message);
	} catch (error) {
		res.status(404).end();
	}
});

server.delete('/:id', userExtractor, (req, res, next) => {
	const { id } = req.params;
	Event.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

server.put('/:id', async (req, res) => {
	const { params } = req;
	const { id } = params;
	const event = req.body;
	const { eventName, location, resume, image, outstanding } = event;
	const updateEvent = {
		eventName,
		location,
		resume,
		image,
		outstanding
	};
	try {
		const findEvent = await Event.findByIdAndUpdate(id, updateEvent);
		res.json(findEvent);
	} catch (error) {
		res.status(404).end();
	}
});

module.exports = server;
