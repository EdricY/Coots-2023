import { useState, useRef, useEffect } from "react";
import Entity, { EntityIcon } from "./Entity";

export default function Trash({ swapHeldItem, trashTime }) {
  const [item, setItem] = useState(null);
  const progressRef = useRef();
  useEffect(() => {
    if (!item?.value) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: trashTime,
      easing: "ease-out",
      iterations: 1,
    });
    const timeout = setTimeout(() => {
      setItem(null);
      animation.cancel();
    }, trashTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [item]);

  return (
    <div>
      Trash
      <button className="cell ovenSquare" onClick={() => setItem(swapHeldItem(item))}>
        <EntityIcon entity={item}></EntityIcon>
      </button>
      <div ref={progressRef} className="progress-bar"></div>
    </div>
  );
}
