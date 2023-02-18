import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function generateGrid() {
    const gridEntries = [];
    for (let index = 0; index < 30; index++) {
      gridEntries.push(<div className="cell"></div>);
    }
    return gridEntries;
  }

  return (
    <div className="App">
      <div>CHEF COOTS</div>
      <div className="grid-container">{generateGrid()}</div>
    </div>
  );
}

export default App;
