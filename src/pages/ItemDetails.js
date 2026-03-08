import React from "react";
import { useParams } from "react-router-dom";

function ItemDetails(){

  const {id} = useParams()

  return(
    <div>

      <h1>Item Details</h1>

      <p>Item ID: {id}</p>

      <button>Claim Item</button>

    </div>
  )
}

export default ItemDetails;