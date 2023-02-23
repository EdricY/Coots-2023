import { useEffect, useRef, useState } from "react";
import { EntityIcon } from "../Entity";
import "./counter.css";

function Counter({ swapHeldItem, gridEntries, setGridEntries }) {
  function handleSelectCell(item, index) {
    let copyGrid = [...gridEntries];
    copyGrid[index] = swapHeldItem(copyGrid[index]);
    setGridEntries(copyGrid);
  }

  return (
    <div className="grid-container">
      {gridEntries.map((x, index) => (
        <button
          className={`cell`}
          key={index}
          onClick={() => {
            handleSelectCell(x, index);
          }}
        >
          <EntityIcon entity={x} />
        </button>
      ))}
    </div>
  );
}

export default Counter;
