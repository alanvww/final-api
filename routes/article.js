const { response } = require('express');
var express = require('express');
var router = express.Router();

const firestore = require('firebase/firestore');

const db = firestore.getFirestore();

// Get article by ID
router.get('/:id', function (req, res) {
	const postId = req.params.id;
	const blogposts = firestore.getDoc(firestore.doc(db, 'blogposts', postId));
	blogposts
		.then((response) => {
			const post = response.data();
			if (post) return res.send(response.data());
			return res.send(`NO A DOC`);
		})
		.catch((error) => {
			res.send(`No Doc???`);
		});
});

router.get('/', (req, res) => {
	res.send(`Please include an ID`);
});

module.exports = router;
