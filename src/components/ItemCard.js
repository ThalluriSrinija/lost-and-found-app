import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div>

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <Link to={`/item/${item.id}`}>
        View Details
      </Link>

    </div>
  );
}

export default ItemCard;