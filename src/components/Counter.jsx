import { useEffect, useRef, useState } from "react";
import "./Counter.css";
import { gridStartData } from "../data";
import { FaBeer } from "react-icons/fa";

function Counter({ swapHeldItem }) {
  const [gridEntries, setGridEntries] = useState(gridStartData);

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
            className="cell"
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
