import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white rounded p-5 text-center shadow">
        <h1 className="display-4 fw-bold"> Library Management System</h1>

        <p className="lead mt-3">
          A modern MERN Stack application to manage books, borrow books,
          return books and efficiently handle library operations.
        </p>

        <div className="mt-4">
          <Link to="/books" className="btn btn-warning btn-lg me-3">
            Browse Books
          </Link>

          {!token && (
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="row mt-5">

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <h1>📖</h1>
              <h5>Browse Books</h5>
              <p>
                Explore all available books with search and pagination.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <h1>🔄</h1>
              <h5>Borrow & Return</h5>
              <p>
                Borrow books easily and return them anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <h1>👨‍💼</h1>
              <h5>Admin Panel</h5>
              <p>
                Admin can add, edit and delete books with dashboard support.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <h1>🔐</h1>
              <h5>Secure Login</h5>
              <p>
                JWT authentication with role-based access control.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center mt-5 mb-3 text-secondary">
        <hr />
        <p>
          © 2026 Library Management System | Developed using React, Node.js,
          Express & MongoDB
        </p>
      </footer>
    </div>
  );
}

export default Home;