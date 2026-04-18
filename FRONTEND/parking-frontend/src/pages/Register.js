import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // 🔥 Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔍 Check if email already exists
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      alert("User already exists ❌");
      return;
    }

    // ➕ Add new user
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password
    };

    users.push(newUser);

    // 💾 Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully 🎉");

    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h2>Create Account</h2>
        <p className="subtitle">Join ParkNova today</p>

        <form className="signup-form" onSubmit={handleRegister}>

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;