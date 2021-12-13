const express = require('express');
// Initiate express
const app = express();
// Setting port - dynamically with Heroku
const port = process.env.PORT || 4000;
// Import Firebase
const firebase = require('firebase/app');
// Get configuration object so we can communicate with firebase
const firebaseConfig = {
	apiKey: 'AIzaSyDXxPtJPCHNyb-s2ZACOhh1-qNSVfTVO7Y',
	authDomain: 'final-project-4d11a.firebaseapp.com',
	projectId: 'final-project-4d11a',
	storageBucket: 'final-project-4d11a.appspot.com',
	messagingSenderId: '82999155333',
	appId: '1:82999155333:web:5bebe67b770e9adde267ec',
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
const articleRoute = require('./routes/article');
const createArticleRoute = require('./routes/createArticle');
// tell express to use routes
app.use('/', indexRoute);
app.use('/article', articleRoute);
app.use('/create', createArticleRoute);
// Listen for port
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
