import { useEffect, useState } from "react";
import { EntityIcon } from "../Entity";
import "./OrderTerminal.css";
import Serve from "./Serve";

const orderExpireTime = 10 * 1000;

export default function OrderTerminal({ orderList, removeFromList, swapHeldItem }) {
  const [fulfilledEntity, setFulfilledEntity] = useState(null);
  console.log("f", fulfilledEntity, fulfilledEntity?.id)
  return (
    <div className="order-queue">
      {orderList.map((x) => (
        <OrderSquare
          key={x.id}
          entity={x}
          onExpire={(entity) => {
            console.log("expired!", entity)
            removeFromList(entity);
          }}
          fulfilled={fulfilledEntity?.id === x.id}
          onFulfillEnd={(entity) => removeFromList(entity)}
        />
      ))}

      <Serve
        swapHeldItem={swapHeldItem}
        orderList={orderList}
        fulfillOrder={x => setFulfilledEntity(x)}
      />
    </div>
  );
}

function OrderSquare({ entity, onExpire, fulfilled, onFulfillEnd }) {
  useEffect(() => {
    const interval = setTimeout(() => {
      if (fulfilled) return;
      onExpire(entity);
    }, orderExpireTime);
    return () => clearTimeout(interval);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      setTimeout(() => {
        console.log("fultilled", entity)
        onFulfillEnd(entity);
      }, 500)
    }

    // no cleanup-- don't cancel timeout if fulfilled changes back to false
  }, [fulfilled]);


  return <div className={`order ${fulfilled ? "fulfilled" : ""}`}>
    <EntityIcon entity={entity} />{entity.id}
    <svg className="circleSvg" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle className="circle" cx="50" cy="50" r="40" strokeWidth="10" fill="none" />
    </svg>
  </div>
}
