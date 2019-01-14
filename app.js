const express = require('express'),
	helmet = require('helmet'),
	bodyParser = require('body-parser'),
	keys = require('./config/keys'),
	path = require('path'),
	fs = require('fs'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	app = express();

//middleware
app.use(helmet());

//parse application/json
app.use(bodyParser.json());
app.use(
	logger('dev', {
		skip: (req, res) => {
			return res.statusCode < 400;
		}
	})
);

//create stream
app.use(
	logger('common', {
		stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
			flags: 'a'
		})
	})
);

//connect db
mongoose
	.connect(
		keys.mongoURI,
		{ useNewUrlParser: true, useFindAndModify: false }
	)
	.then(() => console.log('DB connection successful...'))
	.catch(err => console.error(err));

//require Routes
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const indexRoute = require('./routes/indexRoute');

//use routes
app.use('/', indexRoute);
app.use('/users', userRoutes);
app.use('/cars', carRoutes);

//catch and forward 404 error to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//error handler
app.use((err, req, res, next) => {
	//for client (check for env)
	const error = app.get('env') === 'development' ? err : {};
	const status = error.status || 500;

	app.get('env') === 'development'
		? console.error(error)
		: res.status(status).json({
				error: {
					msg: error.message
				}
		  });
});

//start server app.get('port')
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
