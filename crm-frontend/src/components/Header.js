import React from "react";
import "./Header.css";

function Header() {

  return (
    <div className="header">

      <h2>CRM Dashboard</h2>

      <button className="logout-btn">
        Logout
      </button>

    </div>
  );
}

export default Header;