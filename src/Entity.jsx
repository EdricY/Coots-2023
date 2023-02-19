import { FaEgg } from "react-icons/fa";
import { GiFlour, GiSquib, GiDoughRoller, GiPowderBag, GiStairsCake, GiFishbone } from "react-icons/gi";
import batter from "./assets/batter.png";

const iconMap = new Map(
  Object.entries({
    egg: <FaEgg />,
    flour: <GiFlour />,
    ash: <GiSquib />,
    dough: <GiDoughRoller />,
    batter: <img className="icon-img" src={batter} />,
    sugar: <GiPowderBag />,
    cake: <GiStairsCake />,
    fishbone: <GiFishbone />,
  })
);

export const bakeMap = new Map(
  Object.entries({
    flour: "dough",
    batter: "cake",
  })
);

export const mixerMap = new Map(
  Object.entries({
    "egg-egg-egg-flour-flour-flour-flour-flour-flour": "dough",
    "flour-flour-flour-egg-egg-egg-flour-flour-flour": "dough",
    "flour-flour-flour-flour-flour-flour-egg-egg-egg": "dough",
    "flour-flour-flour-egg-egg-egg-sugar-sugar-sugar": "batter",
    "sugar-sugar-sugar-egg-egg-egg-flour-flour-flour": "batter",
  })
);

export default class Entity {
  icon = "";
  value = null;
  constructor(value) {
    this.icon = iconMap.get(value);
    this.value = value;
  }
}
