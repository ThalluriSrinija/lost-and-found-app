import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ItemDetails from "./pages/ItemDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;