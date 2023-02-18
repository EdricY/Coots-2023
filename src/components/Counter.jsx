import { useEffect, useRef, useState } from "react";
import "./counter.css";

function Counter() {
  const [holdingItem, setHoldingItem] = useState({ icon: "", value: Math.floor(Math.random() * 10) });
  const [gridEntries, setGridEntries] = useState([]);

  function handleSelectCell(item, index) {
    let copyGrid = [...gridEntries];
    setHoldingItem(copyGrid[index]);
    copyGrid[index] = holdingItem;
    setGridEntries(copyGrid);
  }

  const holdRef = useRef();
  useEffect(() => {
    if (!holdRef.current) return;
    const onMouseMove = (e) => {
      holdRef.current.style.left = e.pageX + "px";
      holdRef.current.style.top = e.pageY + "px";
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [holdRef]);

  useEffect(() => {
    let x = [];
    for (let index = 1; index <= 39; index++) {
      x.push({ icon: "", value: Math.floor(Math.random() * 10) });
    }
    x.push({ icon: "", value: null });
    setGridEntries(x);
  }, []);

  return (
    <>
      <div className={`hold-container ${!holdingItem.value ? "hide" : ""}`} ref={holdRef}>
        {holdingItem.value}
      </div>
      <div className="grid-container">
        {gridEntries.map((x, index) => (
          <button
            className="cell"
            key={index}
            onClick={() => {
              handleSelectCell(x, index);
            }}
          >
            {x.value}
          </button>
        ))}
      </div>
    </>
  );
}

export default Counter;
