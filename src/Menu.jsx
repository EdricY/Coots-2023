import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { bgSong } from "./assets/sounds";

export default function Menu({ isOpen, setClosed, level }) {
  const ref = useRef();
  useEffect(() => {
    if (isOpen && !ref.current.open) {
      ref.current.showModal();
    }
  }, [isOpen]);

  const closeAction = () => {
    bgSong.loop = true;
    bgSong.play();
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
            <h2>Welcome to Kittychen Scramble!</h2>
            <p>
              1. <strong>Roll</strong> for resources.
            </p>
            <p>
              2. <strong>Learn</strong> to bake from the recipe book.
            </p>
            <p>
              3. <strong>Bake</strong> using your appliances.
            </p>
            <p>
              4. <strong>Serve</strong> the orders as they come in.
            </p>
            <p>
              Beware of angry cats.
            </p>
          </>
        )}
        {level == 1 && (
          <>
            <div className="text-center bold">Wasn&apos;t that easy?</div>
            <div>Your customers might want more than just bread.</div>
            <div>Maybe the cat needs some love...</div>
            <div className="text-center italic">Your recipe book has been updated.</div>
          </>
        )}
        {level == 2 && (
          <>
            <div className="text-center bold">Nice work!</div>
            <div>Maybe some sweets this time?</div>
            <div>That cat of yours is really getting out of hand.</div>
            <div className="text-center italic">Your recipe book has been updated again.</div>
          </>
        )}
        {level == 3 && (
          <>
            <div className="text-center bold">Amazing job!</div>
            <div>Too many customers yet?</div>
            <div>Better get back to it.</div>
            <div className="text-center italic">Your recipe book has been updated again.</div>
          </>
        )}
        {level == 4 && (
          <>
            <div className="text-center bold">Wow!</div>
            <div>Can you handle more?</div>
          </>
        )}
        {level == 5 && (
          <>
            <div className="text-center bold">That&apos;s all folks!</div>
            <div>That's all the game we have for now.</div>
            <div>Made for Ludwig Jam 2023</div>
            <div>Made by Edric Yu and Imani Muya</div>
            <div>Special thanks to Jacob Bernard</div>
            <div>Check the description for other credits.</div>
            <div><br/></div>
            <div>see ya later</div>
            <div>bye now</div>
            <div>get outta here</div>
          </>
        )}
      </div>
    </dialog>
  );
}
