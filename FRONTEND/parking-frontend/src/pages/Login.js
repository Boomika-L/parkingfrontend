import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  // 🔹 State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        alert("Login successful ✅");

        // ✅ Store user in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Navigate to dashboard
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials ❌");
      }

    } catch (error) {
      console.log("Login error:", error);
      alert("Server error ⚠️");
    } finally {
      setLoading(false);
    }
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

          {/* Options */}
          <div className="options">
            <span className="forgot">Forgot password?</span>
          </div>

          {/* Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Signup Redirect */}
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