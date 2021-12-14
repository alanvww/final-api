const { response } = require('express');
var express = require('express');
// Middleware to allow for routing on the node server
var router = express.Router();
// require firestore
const firestore = require('firebase/firestore');
// Initialized Firestore database
const db = firestore.getFirestore();
// Reference to the blogposts
router.get('/', (req, res) => {
	const lists = firestore.getDocs(firestore.collection(db, 'lists'));
	// Create empty array
	const listsArray = [];

	lists
		.then((response) => {
			response.forEach((doc) => {
				const docData = doc.data();
				docData.id = doc.id;
				// Push document into array every time the query loops over data and push into array
				listsArray.push(docData);
			});
			return res.send(listsArray);
		})
		.catch(function (error) {
			console.log('Error', error);
			return res.send(error);
		});
});

module.exports = router;
