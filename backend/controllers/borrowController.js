const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// ================= Borrow Book =================
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "Book Not Available",
      });
    }

    const borrow = await Borrow.create({
      user: req.user.id,
      book: bookId,
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({
      message: "Book Borrowed Successfully",
      borrow,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= My Borrowed Books =================
const myBorrowedBooks = async (req, res) => {
  try {
    const books = await Borrow.find({
      user: req.user.id,
    })
      .populate("book")
      .populate("user");

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Return Book =================
const returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({
        message: "Borrow Record Not Found",
      });
    }

    if (borrow.status === "Returned") {
      return res.status(400).json({
        message: "Book Already Returned",
      });
    }

    borrow.status = "Returned";
    borrow.returnDate = new Date();
    await borrow.save();

    const book = await Book.findById(borrow.book);

    book.availableCopies += 1;
    await book.save();

    res.status(200).json({
      message: "Book Returned Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  myBorrowedBooks,
  returnBook,
};