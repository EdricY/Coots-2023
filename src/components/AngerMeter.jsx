import { useEffect, useRef, useState } from "react";
import coots1 from "../assets/coots1.png";
import catface1 from "../assets/catface1.png";
import catface2 from "../assets/catface2.png";
import catface3 from "../assets/catface3.png";
import catface4 from "../assets/catface4.png";
import "./AngerMeter.css";

export default function AngerMeter({ progress, onFilled }) {
  const cutInRef = useRef();
  const [showCutIn, setShowCutIn] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setShowCutIn(true)
      const t = setTimeout(() => {
        setShowCutIn(false)
        onFilled()
      }, 2000)
      return () => clearInterval(t);
    }
  }, [progress]);

  const progressStr = Math.min(progress, 100) + "%";
  const animClass = progress >= 90 ? "shake2" : progress >= 80 ? "shake1" : "";
  const face = progress >= 80 ? catface4
    : progress >= 70 ? catface3
      : progress >= 50 ? catface2
        : catface1;



  return (
    <>
      <div className={`meter-container ${animClass}`}>
        <img src={face} className="catface" />
        <div className={`anger-bg`} style={{ height: progressStr }}></div>
        <div className={`anger-meter`} style={{ height: progressStr }}></div>
      </div>
      {showCutIn &&
        <div className="cut-in-wrap" ref={cutInRef}>
          <div className="cut-in-banner">
            <img className="cut-in-img" src={coots1} />
          </div>
        </div>
      }
    </>
  );
}
