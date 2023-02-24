import { useEffect, useRef, useState } from "react";
import { EntityIcon } from "../Entity";
import "./CounterGrid.css";


function Counter({ swapHeldItem, gridEntries, setGridEntries, disabledRow, clearDisabledRow }) {

  useEffect(() => {
    if (disabledRow) {
      const t = setTimeout(() => { clearDisabledRow() }, 3000);
      return () => clearTimeout(t);
    }
  }, [disabledRow])

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
          disabled={Math.floor(index / (gridEntries.length / 3)) + 1 === disabledRow}
        >
          <EntityIcon entity={x} />
        </button>
      ))}
    </div>
  );
}

export default Counter;
