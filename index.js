const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();
require('./mongo');

const routes = require('./routes');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	const link = req.protocol + '://' + req.get('host') + req.originalUrl + 'api/events';
	const message = `<h1>Hello Eventos</h1>
	<p>Para validar eventos necesitas ir a la siguiente ruta
	<a href=${link}>${link}</a></p>`;
	res.send(message);
});

app.use('/api', routes);
app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
	console.log(`Server started on port ${PORT}`);
});

module.exports = { app, server };
