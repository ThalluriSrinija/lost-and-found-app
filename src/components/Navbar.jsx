import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-primary-600 font-semibold" : "text-slate-600 hover:text-primary-600";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-gradient flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Lost & Found
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className={`transition-colors ${isActive('/')}`}>Home</Link>
          <Link to="/report-lost" className={`transition-colors ${isActive('/report-lost')}`}>Report Lost</Link>
          <Link to="/report-found" className={`transition-colors ${isActive('/report-found')}`}>Report Found</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg shadow-primary-600/30 transition-all hover:shadow-primary-600/50 hover:-translate-y-0.5">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;