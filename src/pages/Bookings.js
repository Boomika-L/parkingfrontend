import React, { useEffect, useState } from "react";
import "../styles/Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/my-bookings", {   
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.log(err));
  }, [token]);

  const cancelBooking = async (id) => {
    try {
      await fetch(`http://localhost:8080/cancel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setBookings(bookings.filter(b => b.bookingId !== id));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bookings">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found</p>
      ) : (
        <div className="booking-container">
          {bookings.map((b) => (
            <div className="booking-card" key={b.bookingId}> 
              <p><span>Location:</span> {b.location}</p>
              <p><span>Price:</span> ₹{b.price}</p>
              <p><span>Status:</span> Booked</p>

              <button onClick={() => cancelBooking(b.bookingId)}> 
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;