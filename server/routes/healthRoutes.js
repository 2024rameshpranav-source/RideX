
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RideX API is running successfully!",
    service: "RideX Backend",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;