import React, { useEffect, useState } from "react";
import "../styles/FindParking.css";

function FindParking() {

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/slots")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="find-container">

      <h2>Find Parking</h2>

      {loading ? (
        <p>Loading slots...</p>
      ) : (
        <div className="slots-grid">

          {slots.length === 0 ? (
            <p>No slots available</p>
          ) : (
            slots.map((slot) => (
              <div className="slot-card" key={slot.id}>

                {/* Image */}
                {slot.image && (
                  <img src={slot.image} alt="slot" className="slot-img" />
                )}

                <h3>{slot.location}</h3>
                <p>₹{slot.price}</p>
                <p>{slot.description}</p>

                <span className={`status ${slot.status}`}>
                  {slot.status}
                </span>

                <button
                  disabled={slot.status === "booked"}
                  className="book-btn"
                >
                  {slot.status === "booked" ? "Booked" : "Book Now"}
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