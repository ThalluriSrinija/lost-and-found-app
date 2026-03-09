import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportLost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    contact: "",
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "lost" }),
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to report item");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Report Lost Item</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Item Name" required className="border p-2 rounded" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location Lost" required className="border p-2 rounded" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required className="border p-2 rounded" />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Info (Email/Phone)" required className="border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="border p-2 rounded h-32"></textarea>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}

export default ReportLost;