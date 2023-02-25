import { useEffect, useRef, useState } from "react";
import { FaEgg, FaTimes } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import "./Recipe.css";
import { GiButter, GiFlour, GiPowderBag, GiDoughRoller, GiCorn } from "react-icons/gi";
import batter from "../assets/batter.png";
import icetea from "../assets/icetea1.png";
import awards from "../assets/awards.png";
import wipes from "../assets/wipes.png";

export default function Recipe({ isOpen, setClosed, level }) {
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
          <p className="text-center bold">Magical Mogul's Cutie Baking Book</p>
          <p>
            When I think about cooking I think about life and how much there is to do and learn. Looking at a
            kitchen is like looking at a canvas, so you must make sure that your canvas is clean before you start
            painting. How else do you expect to have a clear look at what you are painting.
          </p>
          <p>Bread</p>
          <p>
            To make dough you&apos;re really going to need to be rooted in the fundamentals.
            First you'll want the egg front and center.
            Then you want a base of 3 units of flour forming a mini pyramid with the egg.
            Last you'll place another egg on the top of the pyramid just for luck.
            Mix and you should be good to go!
            Bake that dough, and you've got yourself a fresh loaf of bread!
          </p>
          <div className="cooking-ad1">
            <img className="adImg" src={icetea} />
          </div>
          <p>
            My friend claims she knows a better way of making dough,
            but I'm not too sure what that's all about.
            She always says something about putting the
            ingredients in the corners of the bowl.
            What bowl has corners?
          </p>

          {level > 0 && <>
            <p>Cornbread</p>
            <p>
              Cornbread is a huge crowdpleaser, your friends will be
              asking you to bring it to super bowl parties,
              work events, even weddings.<br />
              After having made your regular bread, add corn right on top. Simple!
              {/* Now make sure you just put the corn on top of it. Don't run your mixer.
              That would be a mess! */}
            </p>

            <p>Catfood</p>
            <p>
              I thought I'd leave a note here about making food for the kitty.
              You might not have a kitty at home, but my little one always invites herself
              into the kitchen when I'm baking.
              She's interested in just everything but will only eat
              catfood if I make it a specific way.
              It's just three fish mixed together.
              I try to really line up those three fish so the mixer can do it's work.
              When I add that to her bowl, I get a few moments of peace.
              Not sure why the silly thing won't just eat the fish.
            </p>
            <div className="cooking-ad2">
              <img className="adImg" src={wipes} />
            </div>

          </>}

          {level > 1 && <>

            <p>Cake</p>
            <p>
              My grandmother's old recipe. The batter itself is quite a doozy.
              It might take a beginner a few tries to get it right.
              You'll want to add your ingredients in nice layers.
              First comes the sugar, extra sweet.
              Next is the eggs, but only add two. Try to fill in the middle.
              Those eggs get lonely if you split them up.
              Generously sprinkle flour on top of it all to form the top layer.
              Mix well.
              Take that batter and throw it in the oven.
              It's sure to impress your picky grandkids.
            </p>
          </>
          }

          {level > 2 && <>
            <p>Cookie</p>
            <p>
              Aahh the cookie. One of the marks of an expert baker. This recipe is straightforward
              and delicious. You'll get the perfect cookie every time. I hope you're ready!
              First you'll want some cake batter. This is the real secret. Who doesn't love cake?
              Of course, the perfect cookie is just an extension of cake.
              Take that batter and throw it right in the middle of the mixer.
              Then toss in some sugar, butter, and two eggs.
              Mix that up and it's ready for the oven.
              <br />
              Some people have trouble with the sugar part.
              Really, it's up to you how much sugar you want,
              but I like to just keep adding it until that darn bowl is full!
              My daughter likes to tells me "half a bowl of sugar is too much",
              but in all honesty, if it ain't more than half, the kids won't eat!
              <br />

              If you're having trouble with the eggs, you really want to add
              them on the right side bowl with the butter. I find you get
              a lot less shell in your cookies that way.
              <br />

              When you take it out of the oven, make sure to blow on them.
              Not too hard, we don't want floor cookies!
            </p>

          </>
          }
          {/* 
          <div className="cooking-ad swope">SWOPE Beday</div>
          <p>
            Once mixed this will create a creamed batter which when adding the flour, I find it best to position the
            creamed batter really nestled underneath the flour. With twice as much flour as creamed batter.
          </p>
          <p>
            And because the sugar is heavier you'll want that on the bottom. This will make the batter. The batter
            can then be baked in the over to produce cake. If they want a birthday cake make sure you add a candle
          </p>
          <div className="cooking-ad"></div>
          <p>
            which is why you want to fill the center row with it, so everyone will know that it is corn bread, and
            so the corn flavor can seep into the egg below and the flour above.
          </p>
          <div className="cooking-ad">
            <div className="loading">
              <AiOutlineReload />
            </div>
          </div>
          <p>
            You can put the egg on top and all of the flour, that's fine. You can put the egg underneath all the
            flour, you can even put the egg inbetween the flour, flour on top and flour on bottom. Go crazy explore.
            Once you have the dough just go ahead and pop that in the oven. But don't over cook.
          </p> */}

          {/* Sound from Zapsplat.com
          Photo by <a href="https://unsplash.com/@figmentprints?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Cat Han</a> on <a href="https://unsplash.com/backgrounds/colors/black?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

          Photo by <a href="https://unsplash.com/@manosgk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Manos Gkikas</a> on <a href="https://unsplash.com/photos/pPA5ActWLLI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          Photo by <a href="https://unsplash.com/@oguzhanedman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Oğuzhan EDMAN</a> on <a href="https://unsplash.com/photos/_vjEpukAgMw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

          <a href="https://www.flaticon.com/free-icons/batter" title="batter icons">Batter icons created by VitaminRGB - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/bread" title="bread icons">Bread icons created by ultimatearm - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/butter" title="Butter icons">Butter icons created by Smashicons - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/bread" title="bread icons">Bread icons created by kerismaker - Flaticon</a>
          <button onClick={() => setEasyMode(!easyMode)}>{easyMode ? "hard mode recipe" : "easy mode recipes"}</button> */}
        </div>
      </div>
      {
        level >= 2 && <div className="cooking-ad3" onClick={(e) => e.stopPropagation()}>
          <img className="adImg" src={awards} />
        </div>
      }
    </dialog>
  );
}
