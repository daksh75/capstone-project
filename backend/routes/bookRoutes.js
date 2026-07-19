const express = require("express");

const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Admin Only Routes
router.post("/", authMiddleware, adminMiddleware, addBook);
router.put("/:id", authMiddleware, adminMiddleware, updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

module.exports = router;