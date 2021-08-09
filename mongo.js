const mongoose = require('mongoose');

const URI = process.env.MONGO_DB_URI;

mongoose
	.connect(URI, {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() => {
		console.log('Database Connect');
	})
	.catch((err) => {
		console.error(err);
	});

mongoose.now('uncaughtException', () => {
	mongoose.connection.disconnect();
});
