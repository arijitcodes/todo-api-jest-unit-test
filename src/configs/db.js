const mongoose = require("mongoose");

const { MONGODB_CONNECTION_URI } = require("./config");

// DB Connection Method
const connectDB = () => {
  mongoose.set("strictQuery", true);

  mongoose.connect(MONGODB_CONNECTION_URI, (err) => {
    if (err) {
      console.error("🛑 Error: Failed to connect to MongoDB!");
      console.error(err);
      process.exit(1);
    }

    console.log("✨ MongoDB Connected Successfully...");
  });
};

module.exports = connectDB;
