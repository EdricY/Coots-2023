import { useState, useEffect, useRef, Fragment } from "react";
import { FaEgg } from "react-icons/fa";
import { GiButter, GiCorn, GiFeline, GiFlour, GiPowderBag, GiSpellBook } from "react-icons/gi";
import "./App.css";
import AngerMeter from "./components/AngerMeter";
import Counter from "./components/Counter";
import Mixer from "./components/Mixer";
import OrderTerminal from "./components/OrderTerminal";
import CatBox from "./components/CatBox";
import Oven from "./components/Oven";
import Recipe from "./components/Recipe";
import Serve from "./components/Serve";
import Entity, { EntityIcon, iconMap } from "./Entity";
import Trash from "./Trash";
import Dice from "./Dice";
import { gridStartData, levelsData } from "./data";
import Menu from "./Menu";
import coots1 from "./assets/coots1.png";


function App() {
  const [heldItem, setHeldItem] = useState(null);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gridEntries, setGridEntries] = useState(gridStartData);
  const [level, setLevel] = useState(0);
  const [numFulfilled, setNumFulfilled] = useState(0)
  const [disabledRow, setDisabledRow] = useState(0);

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
  const addAnger = (amt) => setAngerProgress(x => Math.max(0, Math.min(100, x + amt)));

  // anger loop

  useEffect(() => {
    const t = setInterval(() => {
      addAnger(levelsData[level].angerIncrement);
    }, 2000);

    return () => {
      clearInterval(t);
    };
  }, [level]);

  const addToGrid = value => {
    const slotIndices = [];
    for (let i = 0; i < gridEntries.length; i++) {
      if (gridEntries[i] === null) slotIndices.push(i);
    }
    if (slotIndices.length === 0) return;
    const r = Math.floor(Math.random() * slotIndices.length)
    const idx = slotIndices[r];
    const entriesCopy = [...gridEntries];
    entriesCopy[idx] = new Entity(value);
    setGridEntries(entriesCopy);
  }

  const [orderList, setOrderList] = useState([]);

  // customer loop
  useEffect(() => {
    const t = setInterval(() => {
      const orders = levelsData[level].orders;
      const newOrder = new Entity(orders[levelsData[level].currentOrder++]);
      setOrderList((current) => [
        ...current,
        newOrder
      ]);
      if (levelsData[level].currentOrder === orders.length) {
        clearInterval(t);
        console.log("end of new customers")
      }

    }, levelsData[level].customerInterval);

    return () => clearInterval(t);
  }, [level])


  useEffect(() => {
    console.log(numFulfilled, levelsData[level].orders.length)
    if (numFulfilled === levelsData[level].orders.length) {
      console.log("level finished!")
      setLevel(level => level + 1);
      // set level num?
    }
  }, [numFulfilled]);

  useEffect(() => {
    setMenuOpen(true);
    setNumFulfilled(0);
    setAngerProgress(0);
  }, [level])

  const onAngerFull = () => {
    setAngerProgress(0);
    const r = Math.floor(Math.random() * 3)
    setDisabledRow(r + 1)
    let start = r * 6;
    let copyGrid = [...gridEntries];
    for (let idx = 0; idx < 6; idx++) {
      copyGrid[start + idx] = null;
    }
    setGridEntries(copyGrid);
  };

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
          <span className="text-shadow">Orders</span>
          <OrderTerminal
            orderList={orderList}
            swapHeldItem={swapHeldItem}
            onExpire={x => {
              // console.log("expired!", x)
              addAnger(45);
              setOrderList(orderList => {
                const orderListCopy = [...orderList].filter(y => y.id !== x.id);
                orderListCopy.push(new Entity(x.value));
                return orderListCopy;
              });
            }}
            onFulfill={x => {
              setOrderList(orderList => [...orderList].filter(y => y.id !== x.id))
              setNumFulfilled(f => f + 1);
            }}
          />

        </div>
      </div>
      <div className="flex">
        <Dice
          diceId={"1"}
          callback={(face, color) => {
            addToGrid(face)
            addAnger(1 + Math.random() * 2)
          }}
        />
        {level >= 1 && <Dice
          diceId={"2"}
          callback={(face, color) => {
            addToGrid(face)
            addAnger(1 + Math.random() * 2)
          }}
        />}
        {level >= 2 && <Dice
          diceId={"3"}
          callback={(face, color) => {
            addToGrid(face)
            addAnger(1 + Math.random() * 2)
          }}
        />}
        {level >= 3 && <Dice
          diceId={"4"}
          callback={(face, color) => {
            addToGrid(face)
            addAnger(1 + Math.random() * 2)
          }}
        />}
      </div>
      <div className="tools-container">
        <Trash swapHeldItem={swapHeldItem} trashTime={2000} />
        <Oven swapHeldItem={swapHeldItem} bakeTime={2000} />
        <Mixer swapHeldItem={swapHeldItem} combineTime={1000} mixTime={3000} />
      </div>
      <Counter
        swapHeldItem={swapHeldItem}
        gridEntries={gridEntries}
        setGridEntries={setGridEntries}
        disabledRow={disabledRow}
        clearDisabledRow={() => setDisabledRow(0)}
      />
      <CatBox swapHeldItem={swapHeldItem} callback={() => addAnger(-40)} />
      <AngerMeter progress={angerProgress} onFilled={onAngerFull} />

      <div className={`hold-container ${!heldItem?.value ? "hide" : ""}`} ref={holdRef}>
        {heldItem && (
          <>
            <div className="hold-icon"><EntityIcon entity={heldItem}></EntityIcon></div>
            <div className="hold-value">{heldItem.value}</div>
          </>
        )}
      </div>
      <Recipe isOpen={recipeOpen} setClosed={() => setRecipeOpen(false)} level={level}/>
      <div className="hide">
        {[...iconMap.entries()].map(([key, icon]) => (<Fragment key={key}>

          {{ ...icon, props: { id: key, ...icon.props, key } }}
        </Fragment>
        ))}
        <img src={coots1} />
      </div>
    </div>
  );
}

export default App;
