import { useEffect, useState } from "react";
import API from "../services/api";

function MyBorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  const getBorrowedBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/borrow/my-books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBorrowedBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const returnBook = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/borrow/return/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      getBorrowedBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2 className="mb-4">My Borrowed Books</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Borrow Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {borrowedBooks.map((item) => (
            <tr key={item._id}>
              <td>{item.book.title}</td>
              <td>{item.book.author}</td>
              <td>{new Date(item.borrowDate).toLocaleDateString()}</td>
              <td>{item.status}</td>

              <td>
                {item.status === "Borrowed" ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => returnBook(item._id)}
                  >
                    Return
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled
                  >
                    Returned
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyBorrowedBooks;