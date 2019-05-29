const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Import Routers here
const cohortRouter = require("./cohorts/cohorts-router.js");


const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("tiny"));

// Set router path here
server.use("/api/cohorts", cohortRouter);


// API is online Notification
server.get("/", (req, res) => {
  res.send("<h1>API is online</h1>");
});

// Export server
module.exports = server;
