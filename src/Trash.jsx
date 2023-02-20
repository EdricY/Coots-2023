import { useState, useRef, useEffect } from "react";
import Entity from "./Entity";

export default function Trash({ swapHeldItem, trashTime }) {
  const [item, setItem] = useState(null);
  const [disposing, setDisposing] = useState(false);
  const progressRef = useRef();
  useEffect(() => {
    if (!disposing) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: trashTime,
      easing: "ease-out",
      iterations: 1,
    });
    const timeout = setTimeout(() => {
      setItem(null);
      animation.cancel();
      setDisposing(false);
    }, trashTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [disposing]);

  return (
    <div>
      Trash
      <button className="cell ovenSquare" disabled={disposing} onClick={() => setItem(swapHeldItem(item))}>
        {item?.icon}
      </button>
      <div ref={progressRef} className="progress-bar"></div>
      <button className="action-btn" disabled={disposing} onClick={() => setDisposing(true)}>
        Dispose
      </button>
    </div>
  );
}
