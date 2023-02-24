import { useState, useRef, useEffect } from "react";
import { GiTrashCan } from "react-icons/gi";
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
      animation.cancel();
    };
  }, [item]);


  return (
    <div>
      <span className="text-shadow">Trash</span>
      <button className="cell ovenSquare relative" onClick={() => setItem(swapHeldItem(item))}>
        <EntityIcon entity={item}></EntityIcon>

        {!item &&
          <div className="absolute inset-0 opacity-sm pointer-events-none">
            <GiTrashCan />
          </div>
        }
      </button>
      <div ref={progressRef} className="progress-bar"></div>
    </div>
  );
}
