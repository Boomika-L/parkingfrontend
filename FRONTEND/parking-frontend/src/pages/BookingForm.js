import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BookingForm.css";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const slot = location.state?.slot;

  const [form, setForm] = useState({
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetch(
        `http://localhost:5000/slots/book/${slot.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            date: form.date,
            time: form.time
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Booking Confirmed 🚗");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  if (!slot) return <p>No slot selected</p>;

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Book Slot</h2>

        <p><b>Location:</b> {slot.location}</p>
        <p><b>Price:</b> ₹{slot.price}</p>

        <form onSubmit={handleBooking}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            required
            onChange={handleChange}
          />

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;