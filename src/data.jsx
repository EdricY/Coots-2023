import { BsFillEggFill } from "react-icons/bs";
import { FaEgg } from "react-icons/fa";
import { GiFlour } from "react-icons/gi";
import Entity from "./Entity";

export const gridStartData = [
  null,
  new Entity("flour"),
  null,
  null,
  null,
  null,
  new Entity("egg"),
  new Entity("egg"),
  null,
  null,
  null,
  null,
  null,
  null,
  new Entity("flour"),
  null,
  new Entity("bread"),
  null,
];


export const levelsData = [
  {
    currentOrder: 0,
    orders: ["bread", "bread", "bread"],
    customerInterval: 20000,
    angerIncrement: 0,
  },
  {
    currentOrder: 0,
    orders: ["bread", "cornbread", "bread", "cornbread", "cornbread", "bread"],
    customerInterval: 20000,
    angerIncrement: 1,
  },
  {
    currentOrder: 0,
    orders: ["cornbread", "bread", "cake", "cornbread", "cake", "bread",],
    customerInterval: 20000,
    angerIncrement: 3,
  },
  {
    currentOrder: 0,
    orders: ["bread", "cake", "cookie", "cookie",],
    customerInterval: 20000,
    angerIncrement: 4,
  },
  {
    currentOrder: 0,
    orders: ["bread", "cornbread", "cookie", "cornbread", "bread", "cornbread", "cake", "cookie", "bread"],
    customerInterval: 20000,
    angerIncrement: 4,
  },
  {
    // unused level
    currentOrder: 0,
    orders: ["bread", "bread", "bread"],
    customerInterval: 200000000,
    angerIncrement: 20,
  },
];
