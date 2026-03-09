import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 relative">
        <div className="absolute inset-0 bg-blue-100/50 rounded-3xl blur-3xl -z-10 transform -translate-y-8"></div>
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-primary-100 to-indigo-100 opacity-50 blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
              Campus Lost & Found Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Lost something precious? <br />
              <span className="text-gradient">We'll help you find it.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Connect with your campus community to report lost items or return found belongings. Together, we can make our campus a better place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/report-lost" className="px-8 py-3.5 text-base font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/30 transition-all hover:shadow-red-500/50 hover:-translate-y-0.5 text-center">
                I Lost Something
              </Link>
              <Link to="/report-found" className="px-8 py-3.5 text-base font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50 hover:-translate-y-0.5 text-center">
                I Found Something
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Reports</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">All</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-transparent text-sm font-medium text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors">Lost</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-transparent text-sm font-medium text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors">Found</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900">No items reported</h3>
            <p className="mt-1 text-sm text-slate-500">Check back later or be the first to report an item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;