import "./Oven.css";
import { useState, useEffect, useRef } from "react";
import Entity, { bakeMap } from "../Entity";

export default function Oven({ swapHeldItem, bakeTime }) {
  const [item, setItem] = useState(null);
  const [baking, setBaking] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const progressRef = useRef();
  useEffect(() => {
    if (!baking) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: bakeTime,
      easing: "ease-out",
      iterations: Infinity,
    });
    const interval = setInterval(() => {
      setItem((item) => {
        if (!item?.value) return item;
        if (item.value === "ash") return item;
        let bakedItem = bakeMap.get(item.value);
        if (!bakedItem) bakedItem = "ash";
        return new Entity(bakedItem);
      });
    }, bakeTime);

    return () => {
      clearInterval(interval);
      animation.cancel();
    };
  }, [baking]);

  return (
    <div>
      Oven
      <button
        className={`cell ovenSquare ${item?.color}`}
        disabled={baking}
        onClick={() => setItem(swapHeldItem(item))}
      >
        {item?.icon}
      </button>
      <div ref={progressRef} className="progress-bar"></div>
      <button className="action-btn" onClick={() => setBaking(!baking)}>
        {baking ? "Stop" : "Bake"}
      </button>
    </div>
  );
}
