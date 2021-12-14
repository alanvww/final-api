const { response } = require('express');
var express = require('express');
var router = express.Router();

// Require Firestore
const firestore = require('firebase/firestore');

// Reference Firestore
const db = firestore.getFirestore();

// API Endpoint for submitting data through our form
router.get('/:id', function (req, res) {
	const listId = req.params.id;
	const listpost = firestore.getDoc(firestore.doc(db, 'lists', listId));

	listpost
		.then((response) => {
			const list = response.data();
			if (list) return res.send(list);
			return res.send({ strContent: 'No List D:' });
		})
		.catch((error) => {
			console.warn(error);
			res.send(error);
		});
});

module.exports = router;
