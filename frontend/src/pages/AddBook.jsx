import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    description: "",
    totalCopies: "",
    availableCopies: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/books", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      navigate("/books");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h2 className="mb-4">Add New Book</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Book Title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="isbn"
              className="form-control"
              placeholder="ISBN"
              value={book.isbn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={book.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              className="form-control"
              rows="4"
              placeholder="Description"
              value={book.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="totalCopies"
              className="form-control"
              placeholder="Total Copies"
              value={book.totalCopies}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="availableCopies"
              className="form-control"
              placeholder="Available Copies"
              value={book.availableCopies}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100">
            Add Book
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddBook;