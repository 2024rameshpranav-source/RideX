
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const healthRoutes = require("./routes/healthRoutes");

// Initialize Express application
const app = express();

// ==========================================
// 1. SECURITY MIDDLEWARE
// ==========================================

app.use(helmet());

// ==========================================
// 2. CORS CONFIGURATION
// ==========================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ==========================================
// 3. REQUEST BODY PARSING
// ==========================================

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 4. REQUEST LOGGING
// ==========================================

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ==========================================
// 5. API RATE LIMITING
// ==========================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// ==========================================
// 6. API ROUTES
// ==========================================

// Health check API
app.use("/api/health", healthRoutes);

// Test API
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "My first RideX test API!",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// 7. HANDLE UNKNOWN ROUTES
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ==========================================
// 8. GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Export Express application
module.exports = app;