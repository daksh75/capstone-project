import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const borrowBook = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      const res = await API.post(
        "/borrow",
        {
          bookId: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      // Refresh book details
      getBook();

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!book) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="card shadow p-4">

      <h2>{book.title}</h2>

      <hr />

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>Category:</strong> {book.category}
      </p>

      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>

      <p>
        <strong>Description:</strong>
        <br />
        {book.description}
      </p>

      <p>
        <strong>Total Copies:</strong> {book.totalCopies}
      </p>

      <p>
        <strong>Available Copies:</strong> {book.availableCopies}
      </p>

      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={borrowBook}
        >
          Borrow Book
        </button>
      </div>

    </div>
  );
}

export default BookDetails;