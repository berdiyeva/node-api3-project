const posts = require("../posts/postDb");
module.exports = () => {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "Missing post data.",
			});
		} else if (!req.body.text) {
			return res.status(400).json({
				message: "missing required text field",
			});
		} else {
			next();
		}
	};
};

//- `validatePost()`
//- `validatePost` validates the `body` on a request to create a new post
//- if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
//- if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`
