const express = require("express");
const logger = require("./middleware/logger");

const server = express();
const port =  8000;

server.get("/", (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}

server.use(logger("long"));

module.exports = server;
