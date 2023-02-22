import { useState, useRef, useEffect } from "react";
import Entity from "../Entity";

export default function Serve({ swapHeldItem, orderList, setOrderList, setMenuOpen }) {
  const [item, setItem] = useState(null);
  const [serving, setServing] = useState(false);
  useEffect(() => {
    if (!serving) return;
    //check orders
    if (orderList[0].value != item.value) {
      setServing(false);
      return;
    }
    setItem(null);
    let newList = [...orderList];
    newList.shift();
    setOrderList(newList);
    if (newList.length == 0) {
      console.log("yay! fulled all the orders");
      // TODO need to make sure this happens at the end of all the orders not just if you are on top of things
      // maybe replace this with a finish level function instead
      setMenuOpen(true);
    }
    setServing(false);
  }, [serving]);

  return (
    <div>
      <button
        className={`cell ovenSquare ${item?.color}`}
        disabled={serving}
        onClick={() => setItem(swapHeldItem(item))}
      >
        {item?.icon}
      </button>
      <button className="" disabled={serving} onClick={() => setServing(true)}>
        Serve
      </button>
    </div>
  );
}
