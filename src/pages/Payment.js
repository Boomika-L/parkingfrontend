import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Bookings.css";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = localStorage.getItem("token");

  if (!state) {
    return (
      <div className="bookings">
        <h2>No Slot Selected ❌</h2>
        <button onClick={() => navigate("/slots")}>
          Go Back
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      await fetch(`http://localhost:8080/book/${state.id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      alert("Payment Successful ✅");
      navigate("/bookings");

    } catch (err) {
      console.log(err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="bookings">
      <h2>Payment</h2>

      <div className="booking-card">
        <p><span>Location:</span> {state.location}</p>
        <p><span>Amount:</span> ₹{state.price}</p>

        <select style={{ marginTop: "10px", padding: "8px" }}>
          <option>UPI</option>
          <option>Card</option>
          <option>Cash</option>
        </select>

        <button onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;