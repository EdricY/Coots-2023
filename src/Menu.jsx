import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";

export default function Menu({ isOpen, setClosed, level }) {
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
  // Note: menu should pop up after every level?? and give you option to upgrade something?? not entirely sure
  return (
    <dialog className="dialog" ref={ref} onClose={() => closeAction()} onClick={() => closeAction()}>
      <div className="dialog-inner" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => closeAction()}>
          <FaTimes />
        </button>
        {level == 0 && (
          <>
            <h2>Welcome to Coots in the Kitchen!</h2>
            <div>
              1. <strong>Roll</strong> for resources
            </div>
            <div>
              2. Check the <strong>recipe book</strong> for how to craft your resources into food{" "}
              <span style={{ fontSize: "25px" }}>
                <GiSpellBook />
              </span>
            </div>
            <div>
              3. Use the <strong>oven</strong> to cook your food
            </div>
            <div>
              4. <strong>Serve</strong> customers in the order they come in
            </div>
          </>
        )}
        {level >= 1 && (
          <>
            <div>Wow you made it!</div>
            <div>Should we give you an upgrade or something???</div>
          </>
        )}
      </div>
    </dialog>
  );
}
