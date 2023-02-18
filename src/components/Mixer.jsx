import "./Mixer.css";
import { useState, useEffect, useRef } from "react";
import Entity, { mixerMap } from "../Entity";

export default function Mixer({ swapHeldItem, combineTime }) {
  const [item1, setItem1] = useState(new Entity());
  const [item2, setItem2] = useState(new Entity());
  const [item3, setItem3] = useState(new Entity());
  const [item4, setItem4] = useState(new Entity());
  const [item5, setItem5] = useState(new Entity());
  const [item6, setItem6] = useState(new Entity());
  const [item7, setItem7] = useState(new Entity());
  const [item8, setItem8] = useState(new Entity());
  const [item9, setItem9] = useState(new Entity());
  const [combining, setCombining] = useState(false);
  const progressRef = useRef();

  useEffect(() => {
    if (!combining) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: combineTime,
      easing: "ease-out",
      iterations: 1,
    });
    const timeout = setTimeout(() => {
      setCombining(false);
      const combineStr = `${item1.value ?? ""}-${item2.value ?? ""}-${item3.value ?? ""}-${item4.value ?? ""}-${item5.value ?? ""}-${
        item6.value ?? ""
      }-${item7.value ?? ""}-${item8.value ?? ""}-${item9.value ?? ""}`;
      console.log(combineStr);
      let combinedVal = mixerMap.get(combineStr);
      if (!combinedVal) combinedVal = "ash";
      setItem1(new Entity());
      setItem2(new Entity());
      setItem3(new Entity());
      setItem4(new Entity());
      setItem6(new Entity());
      setItem7(new Entity());
      setItem8(new Entity());
      setItem9(new Entity());
      setItem5(new Entity(combinedVal));
    }, combineTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [combining]);

  return (
    <div>
      Mixer
      <div className="mixer-grid">
        <button className="cell" disabled={combining} onClick={() => setItem1(swapHeldItem(item1))}>
          {item1.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem2(swapHeldItem(item2))}>
          {item2.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem3(swapHeldItem(item3))}>
          {item3.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem4(swapHeldItem(item4))}>
          {item4.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem5(swapHeldItem(item5))}>
          {item5.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem6(swapHeldItem(item6))}>
          {item6.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem7(swapHeldItem(item7))}>
          {item7.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem8(swapHeldItem(item8))}>
          {item8.icon}
        </button>
        <button className="cell" disabled={combining} onClick={() => setItem9(swapHeldItem(item9))}>
          {item9.icon}
        </button>
      </div>
      <div ref={progressRef} className="progress-bar"></div>
      <button className="action-btn" disabled={combining} onClick={() => setCombining(true)}>
        Combine
      </button>
    </div>
  );
}
