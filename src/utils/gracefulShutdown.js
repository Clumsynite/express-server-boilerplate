const gracefulShutdown = async (server) => {
  try {
    server.close();
    process.exit();
  } catch (error) {
    console.info(error.message);
    process.exit(1);
  }
};

module.exports = gracefulShutdown;
