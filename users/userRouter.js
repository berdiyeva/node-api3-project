const express = require("express");
const users = require("./userDb");
const validateUserId = require("../middleware/validateUserID");
const validateUser = require("../middleware/validateUser");

const router = express.Router();

router.post("/", validateUser(), (req, res, next) => {
	users
		.add(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error adding the user",
			});
		});
});

router.post("/:id/posts", validateUserId(), (req, res) => {
	// do I need to add 'validatePost' here?
	if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for the text.",
		});
	}
	users
		.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Could not create user post",
			});
		});
});

router.get("/", (req, res) => {
	const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	};
	users
		.get(options)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			next(error);
		});
});

router.get("/:id", validateUserId(), (req, res) => {
	res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
	users
		.findUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Could not get user posts",
			});
		});
});

router.delete("/:id", validateUserId(), (req, res) => {
	users
		.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				});
			} else {
				res.status(404).json({
					message: "The user could not be found",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error removing the user",
			});
		});
});

router.put("/:id", validateUser(), validateUserID(), (req, res) => {
	users
		.update(req.params.id, req.body)
		.then(res.status(200).json(req.user))
		.catch();
});

//custom middleware

// function validateUserId(req, res, next) {
// 	// do your magic!
// }

// function validateUser(req, res, next) {
// 	// do your magic!
// }

// function validatePost(req, res, next) {
// 	// do your magic!
// }

module.exports = router;
