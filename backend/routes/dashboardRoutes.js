const express = require("express");

const { getDashboard } = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Dashboard (Admin Only)
router.get("/", authMiddleware, adminMiddleware, getDashboard);

module.exports = router;