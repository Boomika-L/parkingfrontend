import React, { useEffect, useState } from "react";

function Search() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    const res = await fetch("http://localhost:5000/slots");
    const data = await res.json();
    setSlots(data);
  };

  const bookSlot = async (id) => {
    await fetch(`http://localhost:5000/book/${id}`, {
      method: "POST",
    });
    fetchSlots();
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Available Parking Slots</h2>

      {slots.map((slot) => (
        <div key={slot.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <p><b>Location:</b> {slot.location}</p>
          <p><b>Price:</b> ₹{slot.price}</p>
          <p><b>Status:</b> {slot.status}</p>

          {slot.status === "available" && (
            <button onClick={() => bookSlot(slot.id)}>Book</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Search;