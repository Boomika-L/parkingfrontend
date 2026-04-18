import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const allBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      const userBookings = allBookings.filter(
        (b) => b.userId === parsedUser.id
      );

      setBookingsList(userBookings);

      setLoading(false);
    } catch (error) {
      console.log("Invalid user data");
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const stats = {
    bookings: bookingsList.length,
    slots: JSON.parse(localStorage.getItem("slots"))?.length || 0,
    earnings: bookingsList.reduce(
      (sum, b) => sum + Number(b.price || 0),
      0
    ),
    reviews: 0,
  };

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2 className="logo">ParkNova</h2>

        <ul className="menu">
          <li>Dashboard</li>
          <li onClick={() => navigate("/search")}>Find Parking</li>
          <li onClick={() => navigate("/add-slot")}>Add Slot</li>
          <li onClick={() => navigate("/booking")}>Bookings</li>
          <li>Profile</li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="content">

        <header className="topbar">
          <h1>Dashboard</h1>
          <span className="user">
            Welcome, {user?.name || user?.email} 👋
          </span>
        </header>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div className="cards">

            <div className="card">
              <h3>Active Bookings</h3>
              <p>{stats.bookings}</p>
            </div>

            <div className="card">
              <h3>Slots Listed</h3>
              <p>{stats.slots}</p>
            </div>

            <div className="card">
              <h3>Total Earnings</h3>
              <p>₹{stats.earnings}</p>
            </div>

            <div className="card">
              <h3>Reviews</h3>
              <p>{stats.reviews}</p>
            </div>

          </div>
        )}

        <div className="activity">
          <h2>Your Bookings</h2>

          {loading ? (
            <p>Loading bookings...</p>
          ) : bookingsList.length === 0 ? (
            <p>No bookings yet 🚫</p>
          ) : (
            <ul>
              {bookingsList.map((b) => (
                <li key={b.id}>
                  📍 {b.location} — ₹{b.price} <br />
                  🕒 {b.date} at {b.time}
                </li>
              ))}
            </ul>
          )}
        </div>

      </main>
    </div>
  );
}

export default Dashboard;