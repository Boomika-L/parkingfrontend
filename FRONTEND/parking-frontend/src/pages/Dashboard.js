// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css";

// function Dashboard() {
//   const navigate = useNavigate();

//   // 🔹 User state
//   const [user, setUser] = useState(null);

//   // 🔹 Dashboard stats
//   const [stats, setStats] = useState({
//     bookings: 0,
//     slots: 0,
//     earnings: 0,
//     reviews: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (!storedUser || storedUser === "undefined") {
//       navigate("/");
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);

//       // 🔥 Fetch dashboard data from backend
//       fetch(`http://localhost:5000/dashboard/${parsedUser.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setStats({
//             bookings: Number(data.bookings) || 0,
//             slots: Number(data.slots) || 0,
//             earnings: Number(data.earnings) || 0,
//             reviews: Number(data.reviews) || 0,
//           });
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log("Error fetching dashboard:", err);
//           setLoading(false);
//         });

//     } catch (error) {
//       console.log("Invalid user data");
//       localStorage.removeItem("user");
//       navigate("/");
//     }
//   }, [navigate]);

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="dashboard">

//       <aside className="sidebar">
//         <h2 className="logo">ParkNova</h2>

//         <ul className="menu">
//           <li>Dashboard</li>
//           <li onClick={() => navigate("/search")}>Find Parking</li>
//           <li onClick={() => navigate("/add-slot")}>Add Slot</li>
//           <li onClick={() => navigate("/booking")}>Bookings</li>
//           <li>Profile</li>
//         </ul>

//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </aside>

//       {/* 🔹 Main Content */}
//       <main className="content">

//         {/* 🔹 Topbar */}
//         <header className="topbar">
//           <h1>Dashboard</h1>
//           <span className="user">
//             Welcome, {user ? user.name : "User"} 👋
//           </span>
//         </header>

//         {/* 🔹 Cards */}
//         {loading ? (
//           <p>Loading dashboard...</p>
//         ) : (
//           <div className="cards">

//             <div className="card">
//               <h3>Active Bookings</h3>
//               <p>{stats.bookings}</p>
//             </div>

//             <div className="card">
//               <h3>Slots Listed</h3>
//               <p>{stats.slots}</p>
//             </div>

//             <div className="card">
//               <h3>Total Earnings</h3>
//               <p>₹{stats.earnings}</p>
//             </div>

//             <div className="card">
//               <h3>Reviews</h3>
//               <p>{stats.reviews}</p>
//             </div>

//           </div>
//         )}

//         {/* 🔹 Activity Section (static for now) */}
//         <div className="activity">
//           <h2>Recent Activity</h2>

//           <ul>
//             <li>New booking received</li>
//             <li>Your slot was reviewed ⭐⭐⭐⭐⭐</li>
//             <li>Payment credited</li>
//             <li>Slot booked for tomorrow</li>
//           </ul>
//         </div>

//       </main>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // 🔹 User state
  const [user, setUser] = useState(null);

  // 🔹 Dashboard stats
  const [stats, setStats] = useState({
    bookings: 0,
    slots: 0,
    earnings: 0,
    reviews: 0,
  });

  // 🔹 Bookings list
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

      // 🔥 FETCH DASHBOARD STATS
      fetch(`http://localhost:5000/dashboard/${parsedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setStats({
            bookings: Number(data.bookings) || 0,
            slots: Number(data.slots) || 0,
            earnings: Number(data.earnings) || 0,
            reviews: Number(data.reviews) || 0,
          });
        });

      // 🔥 FETCH USER BOOKINGS
      fetch(`http://localhost:5000/bookings/${parsedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBookingsList(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error:", err);
          setLoading(false);
        });

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

  return (
    <div className="dashboard">

      {/* 🔹 Sidebar */}
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

      {/* 🔹 Main Content */}
      <main className="content">

        {/* 🔹 Topbar */}
        <header className="topbar">
          <h1>Dashboard</h1>
          <span className="user">
            Welcome, {user ? user.name || user.email : "User"} 👋
          </span>
        </header>

        {/* 🔹 Cards */}
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

        {/* 🔹 BOOKINGS SECTION */}
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
                  🕒 {new Date(b.created_at).toLocaleString()}
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