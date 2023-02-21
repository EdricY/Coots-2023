import { useState, useEffect, useRef } from "react";
import { FaEgg } from "react-icons/fa";
import { GiButter, GiCorn, GiFeline, GiFlour, GiPowderBag, GiSpellBook } from "react-icons/gi";
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
import Dice from "./Dice";
import { gridStartData } from "./data";

function App() {
  const [heldItem, setHeldItem] = useState(null);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [gridEntries, setGridEntries] = useState(gridStartData);
  const [rollStart, setRollStart] = useState(Date.now());
  const [faceIdx, setFaceIdx] = useState(0);

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

  const orderOptions = ["cookie", "cake", "pretzel", "cornBread"];
  const [orderList, setOrderList] = useState([new Entity(orderOptions[Math.floor(Math.random() * 4)])]);
  useEffect(() => {
    // TODO make order zoom in from the right?
    let orders = 0;
    const t = setInterval(() => {
      setOrderList((current) => [...current, new Entity(orderOptions[Math.floor(Math.random() * 4)])]);
      orders++;
      if (orders >= 10) {
        clearInterval(t);
      }
      // TODO restart interval when orders go back down from 10 to 9
    }, 15000);
    return () => {
      clearInterval(t);
    };
  }, []);

  const onAngerFull = () => {
    setAngerProgress(0);
  };

  function addResource(resource) {
    let copyGrid = [...gridEntries];
    if (copyGrid.filter((x) => x === null).length == 0) return;
    let randoslot = 0;
    //check if grid is full
    while (copyGrid[randoslot]) {
      randoslot = Math.floor(Math.random() * copyGrid.length);
    }

    if (!copyGrid[randoslot]) {
      //TODO maybe add new class here?
      copyGrid[randoslot] = resource;
      setGridEntries(copyGrid);
    }
  }

  const rowStarts = [0, 8, 16];
  function rage() {
    let randomRow = rowStarts[Math.floor(Math.random() * 3)];
    let copyGrid = [...gridEntries];
    for (let idx = 0; idx < copyGrid.length; idx++) {
      if (idx >= randomRow && idx <= randomRow + 7) {
        // TODO add animation here for resources disappearing
        copyGrid[idx] = null;
      }
    }
    setGridEntries(copyGrid);
  }
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
        <div>
          Orders
          <OrderTerminal orderList={orderList} />
          <Serve swapHeldItem={swapHeldItem} orderList={orderList} setOrderList={setOrderList} />
        </div>
      </div>

      <div className="resource-getter">
        <button className="cell" onClick={() => addResource(new Entity("egg"))}>
          <FaEgg />
        </button>
        <button className="cell" onClick={() => addResource(new Entity("flour"))}>
          <GiFlour />
        </button>
        <button className="cell" onClick={() => addResource(new Entity("sugar"))}>
          <GiPowderBag />
        </button>
        <button className="cell" onClick={() => addResource(new Entity("butter"))}>
          <GiButter />
        </button>
        <button className="cell" onClick={() => addResource(new Entity("corn"))}>
          <GiCorn />
        </button>
        <button className="cell" onClick={() => addResource(new Entity("cat"))}>
          <GiFeline />
        </button>
      </div>
      <Dice faceIdx={faceIdx} rollStart={rollStart} />
      <button
        onClick={() => {
          setRollStart(Date.now());
          setFaceIdx(Math.floor(Math.random() * 6));
        }}
      >
        roll
      </button>
      <div className="tools-container">
        <Trash swapHeldItem={swapHeldItem} trashTime={2000} />
        <Oven swapHeldItem={swapHeldItem} bakeTime={2000} />
        <Mixer swapHeldItem={swapHeldItem} combineTime={1000} mixTime={3000} />
      </div>
      <Counter swapHeldItem={swapHeldItem} gridEntries={gridEntries} setGridEntries={setGridEntries} />
      <AngerMeter progress={angerProgress} onFilled={onAngerFull} rage={rage} />

      <div className={`hold-container ${!heldItem?.icon ? "hide" : ""}`} ref={holdRef}>
        {heldItem && (
          <>
            <div className="hold-icon">{heldItem.icon}</div>
            <div className="hold-value">{heldItem.value}</div>
          </>
        )}
      </div>
      <Recipe isOpen={recipeOpen} setClosed={() => setRecipeOpen(false)} />
    </div>
  );
}

export default App;
