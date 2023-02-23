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
import Entity, { EntityIcon } from "./Entity";
import Trash from "./Trash";
import Dice from "./Dice";
import { gridStartData } from "./data";
import Menu from "./Menu";

function App() {
  const [heldItem, setHeldItem] = useState(null);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [gridEntries, setGridEntries] = useState(gridStartData);
  const [rollStart, setRollStart] = useState(Date.now());
  const [faceIdx, setFaceIdx] = useState(0);
  const [level, setLevel] = useState(0);

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
    if (x) x.fresh = false;
    if (heldItem) heldItem.fresh = false;
    setHeldItem(x);
    return heldItem;
  };

  const [angerProgress, setAngerProgress] = useState(0);
  const addAnger = (amt) => setAngerProgress(x => Math.min(100, x+amt));
  useEffect(() => {
    if (level < 1) return;
    const t = setInterval(() => {
      addAnger(2);
    }, 2000);
    return () => {
      clearInterval(t);
    };
  }, [level]);

  const orderOptions = [
    { level: 0, options: ["pretzel"] },
    { level: 1, options: ["pretzel", "cornBread"] },
    { level: 2, options: ["cake", "pretzel", "cornBread"] },
    { level: 3, options: ["cookie", "cake", "pretzel", "cornBread"] },
  ];
  const [orderList, setOrderList] = useState([
    new Entity(orderOptions[level].options[Math.floor(Math.random() * orderOptions[level].options.length)]),
  ]);
  useEffect(() => {
    // TODO make order zoom in from the right?
    let orders = 0;
    let numOfOrders = (level + 2) * 2; // TODO tweak the order numbers
    const t = setInterval(() => {
      setOrderList((current) => [
        ...current,
        new Entity(orderOptions[level].options[Math.floor(Math.random() * orderOptions[level].options.length)]),
      ]);
      orders++;
      if (orders >= numOfOrders) {
        clearInterval(t);
      }
    }, 15000);
    return () => {
      clearInterval(t);
    };
  }, []);

  const onAngerFull = () => {
    setAngerProgress(0);
    rage();
  };

  function addResource(resource) {
    let copyGrid = [...gridEntries];
    if (copyGrid.filter((x) => x === null).length == 0) return;
    let randoslot = 0;
    //checking if grid is full
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
      <Menu isOpen={menuOpen} setClosed={() => setMenuOpen(false)} level={level} />
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
          <Serve
            swapHeldItem={swapHeldItem}
            orderList={orderList}
            setOrderList={setOrderList}
          />
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
      <Dice faceIdx={faceIdx} rollStart={rollStart} level={level} />
      <button
        onClick={() => {
          setRollStart(Date.now());
          setFaceIdx(Math.floor(Math.random() * 6));
          addAnger(Math.random() * 20)
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
      <AngerMeter progress={angerProgress} onFilled={onAngerFull} />

      <div className={`hold-container ${!heldItem?.value ? "hide" : ""}`} ref={holdRef}>
        {heldItem && (
          <>
            <div className="hold-icon"><EntityIcon entity={heldItem}></EntityIcon></div>
            <div className="hold-value">{heldItem.value}</div>
          </>
        )}
      </div>
      <Recipe isOpen={recipeOpen} setClosed={() => setRecipeOpen(false)} />
    </div>
  );
}

export default App;
