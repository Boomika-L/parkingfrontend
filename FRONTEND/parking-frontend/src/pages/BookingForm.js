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

  const handleBooking = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not found. Please login again.");
      return;
    }

    if (!slot) {
      alert("No slot selected");
      return;
    }

    // Get existing bookings
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Create new booking
    const newBooking = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      slotId: slot.id,
      location: slot.location,
      price: slot.price,
      date: form.date,
      time: form.time
    };

    // Save to localStorage
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking Confirmed 🚗 (Saved locally)");

    navigate("/dashboard");
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