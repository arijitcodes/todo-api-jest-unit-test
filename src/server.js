const app = require("./app");
const { PORT } = require("./configs/config");
const connectDB = require("./configs/db");

try {
  // Connect Database
  connectDB();

  // Start Server
  app.listen(PORT, () => {
    console.log(`✨ Server started at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("🔴 Failed to start server! ", error);
}
