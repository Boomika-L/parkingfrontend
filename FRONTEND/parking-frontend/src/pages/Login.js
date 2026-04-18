import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // 🔥 Get registered users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // 🔍 Find matching user
      const foundUser = users.find(
        (u) =>
          u.email === email && u.password === password
      );

      if (foundUser) {
        alert("Login successful ✅");

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(foundUser));

        navigate("/dashboard");
      } else {
        alert("Invalid credentials ❌");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your ParkNova account</p>

        <form className="login-form" onSubmit={handleLogin}>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;