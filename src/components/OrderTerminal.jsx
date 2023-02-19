import { useEffect } from "react";
import "./OrderTerminal.css";

export default function OrderTerminal({ orderList }) {
  return (
    <div className="order-queue">
      {orderList.map((x, index) => (
        <div className="order" key={index}>
          {x.icon}
        </div>
      ))}
    </div>
  );
}
