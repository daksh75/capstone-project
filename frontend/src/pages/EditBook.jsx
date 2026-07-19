import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditBook() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

      const res = await API.put(`/books/${id}`, book, {
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

        <h2 className="mb-4">Edit Book</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Author"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              placeholder="ISBN"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="category"
              value={book.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="totalCopies"
              value={book.totalCopies}
              onChange={handleChange}
              placeholder="Total Copies"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="availableCopies"
              value={book.availableCopies}
              onChange={handleChange}
              placeholder="Available Copies"
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Update Book
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditBook;