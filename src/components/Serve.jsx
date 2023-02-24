import { useState, useRef, useEffect } from "react";
import { GiOpenPalm } from "react-icons/gi";
import { EntityIcon } from "../Entity";
import "./OrderTerminal.css"

export default function Serve({ swapHeldItem, orderList, fulfillOrder }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!item?.value) return;
    if (!orderList?.length) return;
    const matched = orderList.find(x => x.value === item.value);
    if (matched == null) return;
    setItem(null);
    fulfillOrder(matched);
    console.log("serve fulfill")
  }, [item, orderList]);

  return (
    <div className="serve-window">
      <span className="text-shadow">Serve</span>
      <button
        className={`cell ovenSquare relative`}
        onClick={() => setItem(swapHeldItem(item))}
      >
        <div className="absolute inset-0 text-white opacity-sm pointer-events-none flex items-center justify-center">
          <GiOpenPalm />
        </div>
        <EntityIcon entity={item} />
      </button>

    </div>
  );
}
