const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const morgan = require("./middleware/morgan");
const assignId = require("./middleware/assignId");

const healthRoute = require("./routes/health");

const app = express();

// disable `X-Powered-By` header that reveals information about the server
app.disable("x-powered-by");

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use(express.static("public"));

// log endpoints
app.use(assignId);
app.use(morgan);

app.use("/health", healthRoute);

module.exports = app;
