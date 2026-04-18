import React, { useState } from "react";
import "../styles/AddSlot.css";

function AddSlot() {
  const [form, setForm] = useState({
    location: "",
    price: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Slot added successfully 🎉");

      // clear form
      setForm({
        location: "",
        price: "",
        description: "",
        image: ""
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="addslot-container">
      <div className="addslot-card">
        <h2>Add Parking Slot</h2>

        <form className="addslot-form" onSubmit={handleSubmit}>
          
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />

          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
          />

          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Paste image link"
          />

          <button type="submit" className="add-btn">
            Add Slot
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddSlot;