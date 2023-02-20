import { useEffect, useRef, useState } from "react";
import { FaEgg, FaTimes } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import "./Recipe.css";
import { GiButter, GiFlour, GiPowderBag, GiDoughRoller, GiCorn } from "react-icons/gi";
import batter from "../assets/batter.png";
import cookieDough from "../assets/biscuit.png";

export default function Recipe({ isOpen, setClosed }) {
  const ref = useRef();
  const [easyMode, setEasyMode] = useState(false);
  useEffect(() => {
    if (isOpen && !ref.current.open) {
      ref.current.showModal();
    }
  }, [isOpen]);

  const closeAction = () => {
    setClosed();
    ref.current.close();
    document.activeElement?.blur();
  };

  return (
    <dialog className="dialog" ref={ref} onClose={() => closeAction()} onClick={() => closeAction()}>
      <div className="dialog-inner" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => closeAction()}>
          <FaTimes />
        </button>
        <div>
          {easyMode ? (
            <>
              <p>COOKIES</p>
              <p>1st make cookie batter</p>
              <div className="recipe-grid">
                <div className="cell">
                  <GiButter />
                </div>
                <div className="cell">
                  <GiButter />
                </div>
                <div className="cell">
                  <GiButter />
                </div>
                <div className="cell">
                  <GiPowderBag />
                </div>
                <div className="cell">
                  <GiPowderBag />
                </div>
                <div className="cell">
                  <GiPowderBag />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
              </div>
              <p>2nd make the cookie dough</p>
              <div className="recipe-grid">
                <div className="cell">
                  <img className="icon-img" src={batter} />
                </div>
                <div className="cell">
                  <img className="icon-img" src={batter} />
                </div>
                <div className="cell">
                  <img className="icon-img" src={batter} />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
              </div>
              <p>bake.</p>
              <div className="cell">
                <img className="icon-img" src={cookieDough} />
              </div>
              <p>CAKE</p>
              <p>1st make cake batter</p>
              <div className="recipe-grid">
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiPowderBag />
                </div>
                <div className="cell">
                  <GiPowderBag />
                </div>
                <div className="cell">
                  <GiPowderBag />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
              </div>
              <p>bake.</p>
              <div className="cell">
                <img className="icon-img" src={batter} />
              </div>
              <p>CORN BREAD</p>
              <p>1st make dough</p>
              <div className="recipe-grid">
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiCorn />
                </div>
                <div className="cell">
                  <GiCorn />
                </div>
                <div className="cell">
                  <GiCorn />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
              </div>
              <p>bake.</p>
              <div className="cell">
                <GiDoughRoller />
              </div>
              <p>PRETZEL</p>
              <p>1st make dough</p>
              <div className="recipe-grid">
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <GiFlour />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
                <div className="cell">
                  <FaEgg />
                </div>
              </div>
              <p>bake.</p>
              <div className="cell">
                <GiDoughRoller />
              </div>
            </>
          ) : (
            <>
              <p>
                When I think about cooking i think about life and how much there is to be done in it. Looking at a
                kitchen is like looking at a canvas, so you must make sure that your canvas is clean before you start
                painting. How else do you expect to have a clear look at what you are painting.
              </p>
              <p>Cookies.</p>
              <p>
                The first step in baking I would say would be to master the cookie. I like to make my cookies with
                sugar, butter, and eggs, making sure to arrange the butter to lay on top of the sugar in your mixing
                utensil, and the eggs underneath the sugar.
              </p>
              <div className="cooking-add swope">SWOPE Beday</div>
              <p>
                Once mixed this will create a creamed batter which when adding the flour, I find it best to position the
                creamed batter really nestled underneath the flour. With twice as much flour as creamed batter.
              </p>
              <p>Cake.</p>
              <p>Corn Bread.</p>
              <p>Pretzel.</p>
              <p>
                Now the pretzel is maybe my easiest recipe which is why I put it last. Pretezls is just baked dough.
                Remember that, when you boil down all baking you really get down to the fundementals and that
                fundemental can really help you master the more complex stuff. Dough is very forgiving, and really you
                just need to make sure that you layer your ingrediants evenly.
              </p>
              <div className="cooking-add">
                <div className="loading">
                  <AiOutlineReload />
                </div>
              </div>
              <p>
                You can put the egg on top and all of the flour, that's fine. You can put the egg underneath all the
                flour, you can even put the egg inbetween the flour, flour on top and flour on bottom. Go crazy explore.
                Once you have the dough just go ahead and pop that in the oven. But don't over cook.
              </p>
            </>
          )}
          <button onClick={() => setEasyMode(!easyMode)}>{easyMode ? "hard mode recipe" : "easy mode recipes"}</button>
        </div>
      </div>
    </dialog>
  );
}
