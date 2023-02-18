import { useState, useEffect, useRef } from "react";
import "./App.css";
import Counter from "./components/Counter";
import Mixer from "./components/Mixer";
import Oven from "./components/Oven";
import Entity from "./Entity";
import Trash from "./Trash";

function App() {
  const [heldItem, setHeldItem] = useState(new Entity());
  // const [cursorObj, setCursorObj] = useState(0);
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

  const swapHeldItem = (x) => {
    setHeldItem(x);
    return heldItem;
  };

  return (
    <div className="App">
      <button>recipe</button>
      <div>CHEF COOTS</div>
      <div className="tools-container">
        <Trash swapHeldItem={swapHeldItem} trashTime={2000} />
        <Oven swapHeldItem={swapHeldItem} bakeTime={2000} />
        <Mixer swapHeldItem={swapHeldItem} combineTime={2000} />
      </div>
      <Counter swapHeldItem={swapHeldItem} />
      <div className={`hold-container ${!heldItem.icon ? "hide" : ""}`} ref={holdRef}>
        <div>{heldItem.icon}</div>
        <div>{heldItem.value}</div>
      </div>
    </div>
  );
}

export default App;
