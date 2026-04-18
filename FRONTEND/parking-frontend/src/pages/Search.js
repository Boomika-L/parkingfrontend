import React, { useEffect, useState } from "react";

function Search() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = () => {
    const storedSlots =
      JSON.parse(localStorage.getItem("slots")) || [];

    setSlots(storedSlots);
  };

  const bookSlot = (id) => {
    const slots =
      JSON.parse(localStorage.getItem("slots")) || [];

    const updatedSlots = slots.map((slot) => {
      if (slot.id === id) {
        return {
          ...slot,
          status: "booked"
        };
      }
      return slot;
    });

    localStorage.setItem("slots", JSON.stringify(updatedSlots));

    alert("Slot Booked 🚗");

    fetchSlots();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Available Parking Slots</h2>

      {slots.length === 0 ? (
        <p>No slots available</p>
      ) : (
        slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px"
            }}
          >
            <p><b>Location:</b> {slot.location}</p>
            <p><b>Price:</b> ₹{slot.price}</p>
            <p>
              <b>Status:</b>{" "}
              {slot.status || "available"}
            </p>

            {(slot.status === "available" || !slot.status) && (
              <button onClick={() => bookSlot(slot.id)}>
                Book
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Search;