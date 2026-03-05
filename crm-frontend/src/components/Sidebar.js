import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar(){

const user = "User";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

return(

<div className="sidebar">

  <h2 className="logo">CRM SOFTWARE</h2>

  <ul className="menu">

    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>

    <li>
      <Link to="/customers">Customers</Link>
    </li>

    <li>
      <Link to="/leads">Leads</Link>
    </li>

    <li>
      <Link to="/tasks">Tasks</Link>
    </li>

    <li>
      <Link to="/sales">Sales</Link>
    </li>

  </ul>

  {/* Bottom Section */}

  <div className="sidebar-bottom">

    <div className="sidebar-user">
      👤 {user}
    </div>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

</div>

);

}

export default Sidebar;