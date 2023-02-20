import { useState, useRef, useEffect } from "react";
import Entity from "../Entity";

export default function Serve({ swapHeldItem, orderList, setOrderList }) {
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
    setServing(false);
  }, [serving]);

  return (
    <div>
      <button className="cell ovenSquare" disabled={serving} onClick={() => setItem(swapHeldItem(item))}>
        {item?.icon}
      </button>
      <button className="" disabled={serving} onClick={() => setServing(true)}>
        Serve
      </button>
    </div>
  );
}
