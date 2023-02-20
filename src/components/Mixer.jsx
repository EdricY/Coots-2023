import "./Mixer.css";
import { useState, useEffect, useRef } from "react";
import Entity, { combineMap, mixerMap } from "../Entity";

export default function Mixer({ swapHeldItem, combineTime, mixTime }) {
  const [item1, setItem1] = useState(null);
  const [item2, setItem2] = useState(null);
  const [item3, setItem3] = useState(null);
  const [item4, setItem4] = useState(null);
  const [item5, setItem5] = useState(null);
  const [item6, setItem6] = useState(null);
  const [item7, setItem7] = useState(null);
  const [item8, setItem8] = useState(null);
  const [item9, setItem9] = useState(null);
  const [mixing, setMixing] = useState(false);
  const [combining, setCombining] = useState(false);
  const progressRef = useRef();

  useEffect(() => {
    if (!mixing) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: mixTime,
      easing: "ease-out",
      iterations: 1,
    });
    const timeout = setTimeout(() => {
      setMixing(false);
      const mixStr = `${item1?.value ?? ""}-${item2?.value ?? ""}-${item3?.value ?? ""}-${item4?.value ?? ""}-${item5?.value ?? ""}-${item6?.value ?? ""}-${item7?.value ?? ""}-${item8?.value ?? ""}-${item9?.value ?? ""}`;
      console.log(mixStr);
      let mixedVal = mixerMap.get(mixStr);
      if (!mixedVal) mixedVal = "ash";
      setItem1(null);
      setItem2(null);
      setItem3(null);
      setItem4(null);
      setItem6(null);
      setItem7(null);
      setItem8(null);
      setItem9(null);
      setItem5(new Entity(mixedVal));
    }, mixTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [mixing]);

  useEffect(() => {
    if (!combining) return;
    const animation = progressRef.current.animate([{ width: "0" }, { width: "100%" }], {
      duration: combineTime,
      easing: "ease-out",
      iterations: 1,
    });
    const timeout = setTimeout(() => {
      setCombining(false);
      const combineStr = `${item1?.value ?? ""}-${item2?.value ?? ""}-${item3?.value ?? ""}-${item4?.value ?? ""}-${item5?.value ?? ""}-${item6?.value ?? ""}-${item7?.value ?? ""}-${item8?.value ?? ""}-${item9?.value ?? ""}`;
      console.log(combineStr);
      let combinedVal = combineMap.get(combineStr);
      if (!combinedVal) {
        return;
      }
      setItem1(null);
      setItem2(null);
      setItem3(null);
      setItem4(null);
      setItem6(null);
      setItem7(null);
      setItem8(null);
      setItem9(null);
      setItem5(new Entity(combinedVal));
    }, combineTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [combining]);

  const inUse = mixing || combining;
  return (
    <div>
      Mixer
      <div className="mixer-grid">
        <button className="cell" disabled={inUse} onClick={() => setItem1(swapHeldItem(item1))}>
          {item1?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem2(swapHeldItem(item2))}>
          {item2?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem3(swapHeldItem(item3))}>
          {item3?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem4(swapHeldItem(item4))}>
          {item4?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem5(swapHeldItem(item5))}>
          {item5?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem6(swapHeldItem(item6))}>
          {item6?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem7(swapHeldItem(item7))}>
          {item7?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem8(swapHeldItem(item8))}>
          {item8?.icon}
        </button>
        <button className="cell" disabled={inUse} onClick={() => setItem9(swapHeldItem(item9))}>
          {item9?.icon}
        </button>
      </div>
      <div ref={progressRef} className="progress-bar"></div>
      <div className="flex justify-between">
        <button className="action-btn mr-1" disabled={inUse} onClick={() => setMixing(true)}>
          Mix
        </button>
        <button className="action-btn" disabled={inUse} onClick={() => setCombining(true)}>
          Combine
        </button>
      </div>
    </div>
  );
}
