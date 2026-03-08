import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Lost & Found</h2>

      <Link to="/">Home</Link>
      <Link to="/report-lost">Report Lost</Link>
      <Link to="/report-found">Report Found</Link>
      <Link to="/login">Login</Link>

    </nav>
  );
}

export default Navbar;