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
	res.send('<h1>Hello World</h1>');
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
