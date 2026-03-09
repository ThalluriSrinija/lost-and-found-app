import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  const isLost = item.type?.toLowerCase() === 'lost';

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Decorative gradient line at the top based on type */}
      <div className={`h-1.5 w-full ${isLost ? 'bg-gradient-to-r from-red-500 to-rose-400' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`}></div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full tracking-wide uppercase shadow-sm ${
            isLost 
              ? 'bg-red-50 text-red-700 ring-1 ring-red-600/10' 
              : 'bg-green-50 text-green-700 ring-1 ring-green-600/10'
          }`}>
            {item.type || 'UNKNOWN'}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {new Date().toLocaleDateString()} {/* Placeholder for actual date if available */}
          </span>
        </div>

        <h3 className="font-bold text-xl text-slate-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-1">
          {item.title}
        </h3>
        
        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {item.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            <span className="truncate max-w-[120px]">Location</span> {/* Placeholder */}
          </div>
          <Link 
            to={`/item/${item._id}`} 
            className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1 group/link"
          >
            Details 
            <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;