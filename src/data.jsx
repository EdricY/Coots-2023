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
  null,
  null,
  new Entity("fish"),
  new Entity("fish"),
  null,
  null,
  null,
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
    orders: ["cornbread", "cornbread", "bread", "cornbread", "cornbread", "bread",],
    customerInterval: 20000,
    angerIncrement: 2,
  },
  {
    currentOrder: 0,
    orders: ["cornbread", "cornbread", "bread", "cornbread", "cornbread", "bread",],
    customerInterval: 20000,
    angerIncrement: 3,
  },
  {
    currentOrder: 0,
    orders: ["cornbread", "cornbread", "bread", "cornbread", "cornbread", "bread",],
    customerInterval: 20000,
    angerIncrement: 4,
  },
];
