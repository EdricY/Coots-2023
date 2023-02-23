import { useEffect, useRef, useState } from "react";
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
  return (
    <div className={`meter-container ${animClass}`}>
      <div className={`anger-bg`} style={{ height: progressStr }}></div>
      <div className={`anger-meter`} style={{ height: progressStr }}></div>
    </div>
  );
}
