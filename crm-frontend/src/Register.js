import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SALES");

  const handleRegister = async () => {

    try {
      await axios.post("http://localhost:8081/api/register", {
        fullName,
        email,
        password,
        role
      });

      alert("Registration Successful");
      window.location.href = "/";

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          onChange={(e)=>setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <select onChange={(e)=>setRole(e.target.value)}>

          <option value="SALES">Sales</option>
          <option value="ADMIN">Admin</option>

        </select>

        <button onClick={handleRegister}>Register</button>

        <p style={{marginTop:"15px"}}>
          Already have account? 
          <a href="/"> Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;