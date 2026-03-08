import React from "react";

function ReportLost(){

  return(
    <div>

      <h1>Report Lost Item</h1>

      <input placeholder="Item Name" />
      <input placeholder="Location Lost" />

      <textarea placeholder="Description"></textarea>

      <button>Submit</button>

    </div>
  )
}

export default ReportLost;