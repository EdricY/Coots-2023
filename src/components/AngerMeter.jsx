import { useEffect, useRef, useState } from "react";
import catface1 from "../assets/catface1.png";
import catface2 from "../assets/catface2.png";
import catface3 from "../assets/catface3.png";
import catface4 from "../assets/catface4.png";
import "./AngerMeter.css";

export default function AngerMeter({ progress, onFilled }) {
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => { onFilled() }, 500)
      return () => clearInterval(t);
    }
  }, [progress]);

  const progressStr = Math.min(progress, 100) + "%";
  const animClass = progress >= 90 ? "shake2" : progress >= 80 ? "shake1" : "";
  const face = progress >= 90 ? catface4
  : progress >= 70 ? catface3
  : progress >= 50 ? catface2
  : catface1
  return (
    <>
      <div className={`meter-container ${animClass}`}>
        <img src={face} className="catface" />
        <div className={`anger-bg`} style={{ height: progressStr }}></div>
        <div className={`anger-meter`} style={{ height: progressStr }}></div>
      </div>
    </>
  );
}
