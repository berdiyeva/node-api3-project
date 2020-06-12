const users = require("../users/userDb");
module.exports = () => {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "missing user data",
			});
		} else if (!req.body.name) {
			return res.status(400).json({
				message: "missing required name field",
			});
		} else {
			next();
		}
	};
};

//- `validateUser()`

//- `validateUser` validates the `body` on a request to create a new user
//- if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
//- if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`
