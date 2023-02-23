import { useState, useRef, useEffect } from "react";
import { EntityIcon } from "../Entity";

export default function Serve({ swapHeldItem, orderList, setOrderList }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!item?.value) return;
    if (!orderList?.length) return;
    const matchedIdx = orderList.findIndex(x => x.value === item.value);
    if (matchedIdx === -1) return;
    setItem(null);
    let newList = [...orderList];
    newList.splice(matchedIdx, 1);
    setOrderList(newList);
  }, [item, orderList]);

  return (
    <div>
      <button
        className={`cell ovenSquare`}
        onClick={() => setItem(swapHeldItem(item))}
      >
        <EntityIcon entity={item} />
      </button>
    </div>
  );
}
