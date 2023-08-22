const config = require("./config");
const logger = require("./utils/logger");

const app = require("./app");
const gracefulShutdown = require("./utils/gracefulShutdown");

const server = app.listen(config.PORT, async () => {
  logger.info("Server Started", { port: config.PORT });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", async (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", { err });
  await gracefulShutdown(server);
});

// Graceful shutdown on SIGINT and SIGTERM signals
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    logger.warn(`Received ${signal} signal. Shutting down...`);
    await gracefulShutdown(server);
  });
});
