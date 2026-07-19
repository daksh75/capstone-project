import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <NavLink className="navbar-brand fw-bold fs-4" to="/">
           LibraryMS
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <div className="navbar-nav ms-auto align-items-center">

            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/books">
              Books
            </NavLink>

            {!token ? (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>

                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                {user?.role === "admin" ? (
                  <>
                    <NavLink className="nav-link" to="/dashboard">
                      Dashboard
                    </NavLink>

                    <NavLink className="nav-link" to="/add-book">
                      Add Book
                    </NavLink>

                    <span className="badge bg-warning text-dark ms-3 me-2">
                      Admin
                    </span>
                  </>
                ) : (
                  <>
                    <NavLink className="nav-link" to="/my-books">
                      My Borrowed Books
                    </NavLink>

                    <span className="badge bg-success ms-3 me-2">
                      User
                    </span>
                  </>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;