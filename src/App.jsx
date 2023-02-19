import { useState, useEffect, useRef } from "react";
import { GiSpellBook } from "react-icons/gi";
import "./App.css";
import AngerMeter from "./components/AngerMeter";
import Counter from "./components/Counter";
import Mixer from "./components/Mixer";
import OrderTerminal from "./components/OrderTerminal";
import Oven from "./components/Oven";
import Recipe from "./components/Recipe";
import Serve from "./components/Serve";
import Entity from "./Entity";
import Trash from "./Trash";

function App() {
  const [heldItem, setHeldItem] = useState(null);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const holdRef = useRef();
  useEffect(() => {
    if (!holdRef.current) return;
    const onMouseMove = (e) => {
      holdRef.current.style.left = e.pageX + "px";
      holdRef.current.style.top = e.pageY + "px";
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
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

  const orderOptions = ["cookie", "cake", "pretzel"];
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    // TODO make order zoom in from the right
    // TODO make limit for orders
    const t = setInterval(() => {
      setOrderList((current) => [...current, new Entity(orderOptions[Math.floor(Math.random() * 3)])]);
    }, 5000);
    return () => {
      clearInterval(t);
    };
  }, []);

  const onAngerFull = () => {
    setAngerProgress(0);
  };

  return (
    <div className="App">
      <div className="ordersection">
        <button
          className="recipe-btn"
          onClick={() => {
            setRecipeOpen(true);
          }}
        >
          <GiSpellBook />
        </button>
        <OrderTerminal orderList={orderList} />
      </div>
      <div>CHEF COOTS</div>
      <div className="tools-container">
        <Trash swapHeldItem={swapHeldItem} trashTime={2000} />
        <Oven swapHeldItem={swapHeldItem} bakeTime={2000} />
        <Mixer
          swapHeldItem={swapHeldItem}
          combineTime={1000}
          mixTime={3000}
        />
        <Serve swapHeldItem={swapHeldItem} serveTime={2000} orderList={orderList} setOrderList={setOrderList} />
      </div>
      <Counter swapHeldItem={swapHeldItem} />
      <AngerMeter progress={angerProgress} onFilled={onAngerFull} />

      <div className={`hold-container ${!heldItem?.icon ? "hide" : ""}`} ref={holdRef}>
        {heldItem && <>
          <div className="hold-icon">{heldItem.icon}</div>
          <div className="hold-value">{heldItem.value}</div>
        </>}
      </div>
      <Recipe isOpen={recipeOpen} setClosed={() => setRecipeOpen(false)} />
    </div>
  );
}

export default App;
