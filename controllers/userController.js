const server = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/* server.get('/', (req, res) => {
	res.send('Hola Users');
}); */

server.post('/', async (req, res) => {
	try {
		const { body } = req;
		const { username, name, password } = body;

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = new User({
			username,
			name,
			passwordHash
		});

		const savedUser = await user.save();

		res.status(201).json(savedUser);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = server;
