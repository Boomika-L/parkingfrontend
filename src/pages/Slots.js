import React, { useEffect, useState } from "react";
import "../styles/Slot.css";
import { useNavigate } from "react-router-dom";

function Slots() {
  const [slots, setSlots] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:8080/slots")
      .then(res => res.json())
      .then(data => setSlots(data));
  }, []);

  return (
    <div className="slots">
      <h2>Available Slots</h2>

      <div className="slot-grid">
        {slots.map(s => (
          <div className="slot-card" key={s.id}>
            <p>{s.location}</p>
            <p>₹{s.price}</p>

            <button onClick={() => navigate("/payment", { state: s })}>
              Book
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Slots;