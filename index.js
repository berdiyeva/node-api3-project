// code away!

const server = require("./server");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const validateUser = require("./middleware/validateUser");
const validateUserID = require("./middleware/validateUserID");
const validatePostID = require("./middleware/validatePostID");

const port = 8000;

server.use("/users", userRouter);
server.use("/posts", postRouter);
server.use(validateUser());
server.use(validateUserID());
server.use(validatePostID());

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
