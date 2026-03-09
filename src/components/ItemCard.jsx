import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{item.description}</p>
        <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {item.type ? item.type.toUpperCase() : 'UNKNOWN'}
        </span>
      </div>
      <div className="mt-4">
        <Link to={`/item/${item._id}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}

export default ItemCard;