const express = require('express');
// Initiate express
const app = express();
// Setting port - dynamically with Heroku
const port = process.env.PORT || 4000;
// Import Firebase
const firebase = require('firebase/app');
// Get configuration object so we can communicate with firebase
const firebaseConfig = {
	apiKey: 'AIzaSyA2EmRGcbAQYEpYRY7G-gQaaxED8_SXSHE',
	authDomain: 'dynamic-web-app-final.firebaseapp.com',
	projectId: 'dynamic-web-app-final',
	storageBucket: 'dynamic-web-app-final.appspot.com',
	messagingSenderId: '1074003751253',
	appId: '1:1074003751253:web:f0b3f8cfe50487fee47fdc',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// CORS Fix
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	// Pass to next layer of middleware
	next();
});

// routes for directing user to correct place
const indexRoute = require('./routes/index');
const listRoute = require('./routes/list');
const createListRoute = require('./routes/createList');

// Get all posts
app.use('/', indexRoute);
// Submit new post
app.use('/create', createListRoute);

app.use('/list', listRoute);
// Listen for port
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
