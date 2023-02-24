import "./Oven.css";
import { useState, useEffect, useRef } from "react";
import Entity, { bakeMap, EntityIcon, iconMap } from "../Entity";



export default function CatBox({ swapHeldItem, callback }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (item?.value === "catfood") {
      setItem(null);
      callback()
    }
  }, [item]);
  
  return (
    <div className="catBox">
      <div className="absolute inset-0 opacity-sm pointer-events-none">
      {iconMap.get("catfood")}
      </div>
      <button
        className={`cell ovenSquare`}
        onClick={() => setItem(swapHeldItem(item))}
      >
        <EntityIcon entity={item} key={item?.value} />
      </button>
    </div>
  );
}
