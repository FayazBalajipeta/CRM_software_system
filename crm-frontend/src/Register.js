import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "SALES"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    if (!form.fullName || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      await axios.post("http://localhost:8081/api/register", form);

      alert("Registration Successful ✅");

      navigate("/");

    } catch (error) {

      console.error(error);

      if (error.response?.data) {
        alert(error.response.data);
      } else {
        alert("Registration Failed ❌");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Create Account</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="SALES">Sales</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have account?
          <span
            onClick={() => navigate("/")}
            style={{ color: "#4e73df", cursor: "pointer", marginLeft: "5px" }}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;