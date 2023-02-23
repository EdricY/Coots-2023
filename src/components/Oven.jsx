import "./Oven.css";
import { useState, useEffect, useRef } from "react";
import Entity, { bakeMap, EntityIcon } from "../Entity";

export default function Oven({ swapHeldItem, bakeTime }) {
  const [item, setItem] = useState(null);
  const progressRef = useRef();
  useEffect(() => {
    if (!item?.value) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: bakeTime,
      easing: "ease-out",
      iterations: Infinity,
    });
    const timeout = setTimeout(() => {
      setItem((item) => {
        if (!item?.value) return item;
        if (item.value === "ash") return item;
        let bakedItem = bakeMap.get(item.value);
        if (!bakedItem) bakedItem = "ash";
        return new Entity(bakedItem);
      });
    }, bakeTime);

    return () => {
      clearTimeout(timeout);
      animation.cancel();
    };
  }, [item]);

  return (
    <div>
      Oven
      <button
        className={`cell ovenSquare`}
        onClick={() => setItem(swapHeldItem(item))}
      >
        <EntityIcon entity={item} key={item?.value} />
      </button>
      <div ref={progressRef} className="progress-bar"></div>
    </div>
  );
}
