import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
    availableBooks: 0,
  });

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <div className="text-center mb-5">
        <h1 className="fw-bold"> Admin Dashboard</h1>
        <p className="text-muted">
          Monitor your library statistics at a glance.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <div className="card bg-primary text-white shadow dashboard-card h-100">
            <div className="card-body text-center">
              <h1>📚</h1>
              <h5>Total Books</h5>
              <h2 className="fw-bold">{dashboard.totalBooks}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-success text-white shadow dashboard-card h-100">
            <div className="card-body text-center">
              <h1>👥</h1>
              <h5>Total Users</h5>
              <h2 className="fw-bold">{dashboard.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-warning text-dark shadow dashboard-card h-100">
            <div className="card-body text-center">
              <h1>📖</h1>
              <h5>Borrowed Books</h5>
              <h2 className="fw-bold">{dashboard.borrowedBooks}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-danger text-white shadow dashboard-card h-100">
            <div className="card-body text-center">
              <h1>✅</h1>
              <h5>Available Books</h5>
              <h2 className="fw-bold">{dashboard.availableBooks}</h2>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;