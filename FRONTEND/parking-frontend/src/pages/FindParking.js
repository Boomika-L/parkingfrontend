import React, { useEffect, useState } from "react";
import "../styles/FindParking.css";
import { useNavigate } from "react-router-dom";

function FindParking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 Get slots from localStorage instead of backend
    const storedSlots =
      JSON.parse(localStorage.getItem("slots")) || [];

    setSlots(storedSlots);
    setLoading(false);
  }, []);

  const handleBook = (slot) => {
    navigate("/booking", { state: { slot } });
  };

  return (
    <div className="find-container">

      <h2>Find Parking</h2>

      {loading ? (
        <p>Loading slots...</p>
      ) : (
        <div className="slots-grid">

          {slots.length === 0 ? (
            <p>No slots available 🚫</p>
          ) : (
            slots.map((slot) => (
              <div className="slot-card" key={slot.id}>

                {/* Image */}
                {slot.image && (
                  <img
                    src={slot.image}
                    alt="slot"
                    className="slot-img"
                  />
                )}

                <h3>{slot.location}</h3>
                <p>₹{slot.price}</p>
                <p>{slot.description}</p>

                <span className="status available">
                  available
                </span>

                <button
                  className="book-btn"
                  onClick={() => handleBook(slot)}
                >
                  Book Now
                </button>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default FindParking;