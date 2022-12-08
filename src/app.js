const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/* 
    Routes Import
*/
const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");

const app = express();

/* 
    Middlewares Setup
*/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* 
    Routes Setup
*/
app.use("/", indexRouter);
app.use("/api/todo", todoRouter);

/*
    Error 404 Route Handle
*/
app.use("*", (req, res, next) => {
  return res.status(404).json({ error: "Error 404 - Resource Not Found!" });
});

/*
    General Error Handler
 */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  // console.log(err);
  return res.status(statusCode).json({ error: err.message, stack: err.stack });
});

module.exports = app;
