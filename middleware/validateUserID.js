const users = require("../users/userDb");
module.exports = () => {
	return (req, res, next) => {
		users
			.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(400).json({
						message: "invalid user id",
					});
				}
			})
			.catch(next);
	};
};

//- `validateUserId()`

//- `validateUserId` validates the user id on every request that expects a user id parameter
//- if the `id` parameter is valid, store that user object as `req.user`
//- if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`
