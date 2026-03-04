import React from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <div className="dashboard-header">
          <h2>CRM Dashboard</h2>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="cards">

          <div className="card customers">
            <h3>Total Customers</h3>
            <p>120</p>
          </div>

          <div className="card leads">
            <h3>Total Leads</h3>
            <p>75</p>
          </div>

          <div className="card tasks">
            <h3>Open Tasks</h3>
            <p>32</p>
          </div>

          <div className="card sales">
            <h3>Total Sales</h3>
            <p>$45,000</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;