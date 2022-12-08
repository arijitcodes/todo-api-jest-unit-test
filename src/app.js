var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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