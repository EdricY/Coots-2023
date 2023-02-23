import { useEffect } from "react";
import { EntityIcon } from "../Entity";
import "./OrderTerminal.css";

export default function OrderTerminal({ orderList }) {
  return (
    <div className="order-queue">
      {orderList.map((x, index) => (
        <div className="order" key={index}>
          <EntityIcon entity={x} />
        </div>
      ))}
    </div>
  );
}
