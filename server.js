const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Import Router here

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());

// Set router path here

// API is online Notification
server.get("/", (req, res) => {
  res.send("<h1>API is online</h1>");
});

// Export server
module.exports = server;
