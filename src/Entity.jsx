import { FaEgg } from "react-icons/fa";
import { GiFlour, GiSquib, GiDoughRoller } from "react-icons/gi";

const iconMap = new Map(
  Object.entries({
    egg: <FaEgg />,
    flour: <GiFlour />,
    ash: <GiSquib />,
    dough: <GiDoughRoller />,
  })
);

export const bakeMap = new Map(
  Object.entries({
    flour: "dough",
  })
);

export const mixerMap = new Map(
  Object.entries({
    "egg-egg-egg-flour-flour-flour-flour-flour-flour": "dough",
    "flour-flour-flour-egg-egg-egg-flour-flour-flour": "dough",
    "flour-flour-flour-flour-flour-flour-egg-egg-egg": "dough",
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
