const app = require("./app");
const { PORT } = require("./configs/config");

try {
  app.listen(PORT, () => {
    console.log(`✨ Server started at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("🔴 Failed to start server! ", error);
}
