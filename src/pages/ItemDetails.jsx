import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUserEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/items/${id}`);
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to mark this item as resolved? It will be permanently deleted.")) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5001/api/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete item");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setIsDeleting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  if (!item) return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md w-full">
        <svg className="mx-auto h-16 w-16 text-slate-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Item Not Found</h2>
        <p className="text-slate-600 mb-8">The item you are looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors w-full">
          Return Home
        </Link>
      </div>
    </div>
  );

  const isLost = item.type?.toLowerCase() === 'lost';

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 tracking-tight">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors mb-6 group">
          <svg className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all items
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
          {/* Header Strip */}
          <div className={`h-3 w-full ${isLost ? 'bg-gradient-to-r from-red-500 to-rose-400' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`}></div>
          
          <div className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm ${
                    isLost 
                      ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20' 
                      : 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                  }`}>
                    {item.type || 'UNKNOWN'}
                  </span>
                  <span className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {item.title}
                </h1>
              </div>
              
              <div className="shrink-0 flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-slate-700">{item.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Description</h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  {item.description.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-indigo-500"></div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Contact Owner</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2 text-slate-500">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold">Contact Details</span>
                      </div>
                      <p className="font-medium text-slate-900 ml-11">{item.contact}</p>
                    </div>
                  </div>

                  <a 
                    href={item.contact.includes('@') ? `mailto:${item.contact}` : `tel:${item.contact}`}
                    className="mt-8 flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-lg shadow-primary-600/20 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:shadow-primary-600/40 hover:-translate-y-0.5 w-full"
                  >
                    Get in Touch
                  </a>

                  {currentUserEmail === item.userEmail && (
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`mt-4 flex justify-center items-center px-4 py-3 border border-red-200 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all w-full ${isDeleting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isDeleting ? 'Deleting...' : 'Mark as Resolved (Delete)'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;