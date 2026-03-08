import React from "react";
import ItemCard from "../components/ItemCard";

const dummyItems = [
  {
    id:1,
    name:"Black Wallet",
    description:"Lost near library"
  },
  {
    id:2,
    name:"Blue Bottle",
    description:"Found in canteen"
  }
];

function Home() {

  return (
    <div>

      <h1>Lost & Found Items</h1>

      {dummyItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}

    </div>
  );
}

export default Home;