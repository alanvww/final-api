const { response } = require('express');
var express = require('express');
var router = express.Router();

// Create form for submitting
const form = `
<h1>Create Post</h1>
<form action=/create/submit>
	<div style="display: flex; flex-direction: column; margin-bottom: 20px; max-width: 325px">
		<label for="articleTitle">Article Title</label>
		<input type="text" name="articleTitle" placeholder="type article title">

		<label for="articleText">Article Text</label>
		<input type="text" name="articleText" placeholder="type article text">

		<label for="author">Author</label>
		<input type="text" name="author" placeholder="type author">
	</div>
	<button type="submit">Submit Article</button>
</form>`;

// Require Firestore
const firestore = require('firebase/firestore');

// Reference Firestore
const db = firestore.getFirestore();

// Serves web form for users
router.get('/', function (req, res) {
	res.send(form);
});

// API Endpoint for submitting data through our form
router.get('/submit', function (req, res) {
	const queryParams = req.query; // Query params from URL
	const title = queryParams.articleTitle;
	const author = queryParams.author;
	const text = queryParams.articleText;

	// Create ID from title
	const idFromTitle = title.replace(/\s+/g, '-').toLowerCase();
	// Submit post to Firebase
	const setBlogPost = firestore.setDoc(
		firestore.doc(db, 'blogposts', idFromTitle),
		{
			title: title,
			text: text,
			author: author,
		}
	);

	setBlogPost
		.then((response) => {
			// IF successful send correct message
			res.send(`
			<h1>Submission Successful!</h1>
			<p><a href="/create">Add Another Post</a></p>`);
		})
		.catch((error) => {
			console.warn(error);
			res.send(`Error Submitting: ${error.toString()}`);
		});
});

module.exports = router;
