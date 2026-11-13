
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

// Start the RideX server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("--------------------------------");
      console.log("       RideX Backend Server");
      console.log("--------------------------------");
      console.log(`Server running on port: ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Health API: http://localhost:${PORT}/api/health`);
      console.log("--------------------------------");
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
