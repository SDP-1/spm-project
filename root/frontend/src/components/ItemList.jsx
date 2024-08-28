import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();

    const socket = io("http://localhost:5000");

    socket.on("itemAdded", (newItem) => {
      setItems((prevItems) => [...prevItems, newItem]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="border p-2 mb-2">
            <h3 className="font-bold">{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
