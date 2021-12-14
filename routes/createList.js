const { response } = require('express');
var express = require('express');
var router = express.Router();

// Require Firestore
const firestore = require('firebase/firestore');

// Reference Firestore
const db = firestore.getFirestore();

// API Endpoint for submitting data through our form
router.get('/', function (req, res) {
	const queryParams = req.query; // Query params from URL
	const { htmlContent, strContent, userName, userId } = queryParams;

	// Submit post to Firebase
	const setListPost = firestore.addDoc(firestore.collection(db, 'lists'), {
		htmlContent,
		strContent,
		userName,
		userId,
	});

	setListPost
		.then((response) => {
			// IF successful send correct message
			res.send(response);
		})
		.catch((error) => {
			console.warn(error);
			res.send(error);
		});
});

module.exports = router;
