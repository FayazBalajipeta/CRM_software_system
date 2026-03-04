import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const { data } = await axios.post("http://localhost:8081/api/login", {
        email: email,
        password: password
      });

      // store JWT token
      localStorage.setItem("token", data.token);

      // redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      alert("Login failed. Please check email or password.");
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
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
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