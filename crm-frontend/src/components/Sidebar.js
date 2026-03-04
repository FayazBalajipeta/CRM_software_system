import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>CRM</h2>

      <nav>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/customers">Customers</Link>

        <Link to="/leads">Leads</Link>

        <Link to="/tasks">Tasks</Link>

        <Link to="/sales">Sales</Link>

      </nav>

    </div>
  );
}

export default Sidebar;