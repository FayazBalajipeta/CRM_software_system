import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post("http://localhost:8081/api/login", {
        email: email,
        password: password
      });

      const data = response.data;

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user email for Navbar
      localStorage.setItem("userEmail", email);

      // Redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {

      if (error.response) {
        alert(error.response.data || "Invalid email or password");
      } else {
        alert("Server not reachable. Check backend.");
      }

    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key login
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>CRM Login</h2>
        <p className="subtitle">Welcome back</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px" }}>
          Don't have an account?
          <a href="/register"> Register</a>
        </p>

      </div>

    </div>
  );
}

export default Login;