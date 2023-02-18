import { useEffect, useRef, useState } from "react";
import "./counter.css";
import { initEntries } from "../initEntries";
import { FaBeer } from "react-icons/fa";

function Counter() {
  const [holdingItem, setHoldingItem] = useState({ icon: "", value: null });
  const [gridEntries, setGridEntries] = useState(initEntries);

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
            {x.icon}
          </button>
        ))}
      </div>
    </>
  );
}

export default Counter;
