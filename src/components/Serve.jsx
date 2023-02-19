import { useState, useRef, useEffect } from "react";
import Entity from "../Entity";

export default function Serve({ swapHeldItem, serveTime, orderList, setOrderList }) {
  const [item, setItem] = useState(new Entity());
  const [serving, setServing] = useState(false);
  const progressRef = useRef();
  useEffect(() => {
    if (!serving) return;
    //check orders
    if (orderList[0].value != item.value) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: serveTime,
      easing: "ease-out",
      iterations: 1,
    });
    const timeout = setTimeout(() => {
      setItem(new Entity());
      //TODO: add animation for order dissapearing
      //TODO: remove first order
      setOrderList(orderList.filter((x) => x.value != item.value));
      animation.cancel();
      setServing(false);
    }, serveTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [serving]);

  return (
    <div>
      Serve
      <button className="cell ovenSquare" disabled={serving} onClick={() => setItem(swapHeldItem(item))}>
        {item.icon}
      </button>
      <div ref={progressRef} className="progress-bar"></div>
      <button className="action-btn" disabled={serving} onClick={() => setServing(true)}>
        Serve
      </button>
    </div>
  );
}
