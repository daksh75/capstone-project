const Book = require("../models/Book");
const Borrow = require("../models/Borrow");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalUsers = await User.countDocuments();

    const borrowedBooks = await Borrow.countDocuments({
      status: "Borrowed",
    });

    const availableBooks = await Book.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$availableCopies",
          },
        },
      },
    ]);

    res.status(200).json({
      totalBooks,
      totalUsers,
      borrowedBooks,
      availableBooks:
        availableBooks.length > 0
          ? availableBooks[0].total
          : 0,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};