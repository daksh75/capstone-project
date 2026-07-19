const express = require("express");

const {
  borrowBook,
  myBorrowedBooks,
  returnBook,
} = require("../controllers/borrowController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Borrow Book
router.post("/", authMiddleware, borrowBook);

// My Borrowed Books
router.get("/my-books", authMiddleware, myBorrowedBooks);

// Return Book
router.put("/return/:id", authMiddleware, returnBook);

module.exports = router;