import { useEffect, useRef, useState } from "react";
import "./Counter.css";

function Counter({ swapHeldItem, gridEntries, setGridEntries }) {
  function handleSelectCell(item, index) {
    let copyGrid = [...gridEntries];
    copyGrid[index] = swapHeldItem(copyGrid[index]);
    setGridEntries(copyGrid);
  }

  return (
    <>
      <div className="grid-container">
        {gridEntries.map((x, index) => (
          <button
            className={`cell ${x?.color}`}
            key={index}
            onClick={() => {
              handleSelectCell(x, index);
            }}
          >
            {x?.icon}
          </button>
        ))}
      </div>
    </>
  );
}

export default Counter;
