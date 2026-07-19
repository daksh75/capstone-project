import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookCard({ book }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const deleteBook = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/books/${book._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100 book-card">
        <div className="card-body d-flex flex-column">

          <h4 className="book-title mb-3">{book.title}</h4>

          <p className="book-author">
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <span className="badge bg-primary">
              {book.category}
            </span>
          </p>

          <p>
            {book.availableCopies > 0 ? (
              <span className="badge bg-success">
                Available: {book.availableCopies}
              </span>
            ) : (
              <span className="badge bg-danger">
                Out of Stock
              </span>
            )}
          </p>

          <div className="mt-auto">

            <Link
              to={`/book/${book._id}`}
              className="btn btn-primary w-100 mb-2"
            >
              View Details
            </Link>

            {user?.role === "admin" && (
              <div className="d-flex gap-2">

                <button
                  className="btn btn-warning flex-fill"
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger flex-fill"
                  onClick={deleteBook}
                >
                  Delete
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default BookCard;