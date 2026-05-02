import React, { useEffect, useState } from "react";
import SlotCard from "../components/SlotCard";

function FindParking() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/slots")
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Available Parking Slots</h2>

      {slots.map(slot => (
        <SlotCard key={slot.id} slot={slot} />
      ))}
    </div>
  );
}

export default FindParking;