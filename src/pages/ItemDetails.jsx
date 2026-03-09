import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/${id}`);
        if(response.ok) {
          const data = await response.json();
          setItem(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!item) return <div className="p-4">Item not found</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <div className="border rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {item.type.toUpperCase()}
        </span>
        <div className="space-y-3 text-gray-700">
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
          <p><strong>Contact:</strong> {item.contact}</p>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Contact via Email</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;