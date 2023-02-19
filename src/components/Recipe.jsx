import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./Recipe.css";

export default function Recipe({ isOpen, setClosed }) {
  const ref = useRef();

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
          <p>
            When I think about cooking i think about life and how much there is to be done in it. Looking at a kitchen
            is like looking at a canvas, so you must make sure that your canvas is clean before you start painting. How
            else do you expect to have a clear look at what you are painting.
          </p>
          <p>Cookies.</p>
          <p>
            The first step in baking I would say would be to master the cookie. I like to make my cookies with sugar,
            butter, and eggs, making sure to arrange the sugar to lay on top of the butter in your mixing utensil, and
            the eggs on top of the sugar.
          </p>
          <div className="cooking-add swope">SWOPE Beday</div>
          <p>
            Once mixed this will create a creamed batter which when adding the flour, I find it best to position the
            creamed batter to the right of the flour. Not the left mind you, the right side just give it that umf. With
            twice as much flout as creamed batter
          </p>
          <p>Cake.</p>
        </div>
      </div>
    </dialog>
  );
}
