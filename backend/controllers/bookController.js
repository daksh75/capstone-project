const Book = require("../models/Book");

// ================= Add Book =================
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      description,
      totalCopies,
      availableCopies,
    } = req.body;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        message: "Book already exists",
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      description,
      totalCopies,
      availableCopies,
    });

    res.status(201).json({
      message: "Book Added Successfully",
      book,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get All Books + Search + Pagination =================
const getBooks = async (req, res) => {
  try {
    const { search, page = 1, limit = 5 } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            author: {
              $regex: search,
              $options: "i",
            },
          },
          {
            category: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    const totalBooks = await Book.countDocuments(query);

    const books = await Book.find(query)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      totalBooks,
      currentPage,
      totalPages: Math.ceil(totalBooks / perPage),
      books,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get Single Book =================
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Update Book =================
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    res.status(200).json({
      message: "Book Updated Successfully",
      book,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete Book =================
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    res.status(200).json({
      message: "Book Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};