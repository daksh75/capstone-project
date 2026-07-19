import { useEffect, useState } from "react";
import API from "../services/api";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getBooks();
  }, [currentPage]);

  const getBooks = async () => {
    try {
      const res = await API.get(
        `/books?page=${currentPage}&search=${search}`
      );

      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    getBooks();
  };

  return (
    <div className="container">

      <div className="text-center mb-5">
        <h1 className="fw-bold"> Library Books</h1>

        <p className="text-muted">
          Browse, search and explore the books available in the library.
        </p>

        <span className="badge bg-dark fs-6">
          Showing {books.length} Books
        </span>
      </div>

      <div className="row mb-4">

        <div className="col-md-9 mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="🔍 Search by title, author or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      </div>

      <div className="row">

        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No Books Found </h4>
            <p className="text-muted">
              Try searching with another keyword.
            </p>
          </div>
        )}

      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

    </div>
  );
}

export default Books;