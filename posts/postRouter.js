const express = require("express");
const posts = require("./postDb");
const validatePostId = require("../middleware/validatePostID");

const router = express.Router();

router.get("/", (req, res) => {
	posts
		.get({
			sortBy: req.query.sort,
			limit: req.query.limit,
		})
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "The posts information could not be retrieved.",
			});
		});
});

router.get("/:id", validatePostId(), (req, res) => {
	res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
	posts
		.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The message has been deleted.",
				});
			} else {
				res.status(404).json({
					message: "The post with specified ID doesn't exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "The post could not be removed.",
			});
		});
});

router.put("/:id", (req, res) => {
	// if (!req.body.text) {
	// 	return res.status(400).json({
	// 		errorMessage: "Please provide text for the post.",
	// 	});
	// }
	posts
		.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({ error: "The post information could not be modified." });
		});
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
