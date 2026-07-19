import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import MyBorrowedBooks from "./pages/MyBorrowedBooks";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />

          <Route
            path="/my-books"
            element={
              <ProtectedRoute>
                <MyBorrowedBooks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-book"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-book/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;