import { useState, useEffect, useRef } from "react";
import "./App.css";
import AngerMeter from "./components/AngerMeter";
import Counter from "./components/Counter";
import Mixer from "./components/Mixer";
import Oven from "./components/Oven";
import Entity from "./Entity";
import Trash from "./Trash";

function App() {
  const [heldItem, setHeldItem] = useState(new Entity());
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

  const [angerProgress, setAngerProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setAngerProgress((x) => x + 2);
    }, 2000);
    return () => {
      clearInterval(t);
    };
  }, []);

  const onAngerFull = () => {
    setAngerProgress(0);
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
      <AngerMeter progress={angerProgress} onFilled={onAngerFull} />
      <div className={`hold-container ${!heldItem.icon ? "hide" : ""}`} ref={holdRef}>
        <div className="hold-icon">{heldItem.icon}</div>
        <div className="hold-value">{heldItem.value}</div>
      </div>
    </div>
  );
}

export default App;
