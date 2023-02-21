import { FaEgg } from "react-icons/fa";
import { HiCake } from "react-icons/hi";
import {
  GiFlour,
  GiSquib,
  GiDoughRoller,
  GiPowderBag,
  GiStairsCake,
  GiFishbone,
  GiButter,
  GiCookie,
  GiPretzel,
  GiCorn,
  GiBreadSlice,
  GiHollowCat,
  GiFeline,
} from "react-icons/gi";
import batter from "./assets/batter.png";
import cookieDough from "./assets/biscuit.png";

const iconMap = new Map(
  Object.entries({
    egg: <FaEgg />,
    flour: <GiFlour />,
    ash: <GiSquib />,
    dough: <GiDoughRoller />,
    cornDough: <GiDoughRoller />,
    batter: <img className="icon-img" src={batter} />,
    sugar: <GiPowderBag />,
    cake: <GiStairsCake />,
    fishbone: <GiFishbone />,
    butter: <GiButter />,
    cookie: <GiCookie />,
    cookieDough: <img className="icon-img" src={cookieDough} />,
    pretzel: <GiPretzel />,
    corn: <GiCorn />,
    cornBread: <GiBreadSlice />,
    "birthday cake": <HiCake />,
    "happy coots": <GiHollowCat />,
    cat: <GiFeline />,
  })
);

export const bakeMap = new Map(
  Object.entries({
    flour: "dough",
    batter: "cake",
    cookieDough: "cookie",
    dough: "pretzel",
    cornDough: "cornBread",
  })
);

export const mixerMap = new Map(
  Object.entries({
    "egg-egg-egg-flour-flour-flour-flour-flour-flour": "dough",
    "flour-flour-flour-egg-egg-egg-flour-flour-flour": "dough",
    "flour-flour-flour-flour-flour-flour-egg-egg-egg": "dough",
    "flour-flour-flour-corn-corn-corn-egg-egg-egg": "cornDough",
    "flour-flour-flour-egg-egg-egg-sugar-sugar-sugar": "batter",
    "sugar-sugar-sugar-egg-egg-egg-flour-flour-flour": "batter",
    "butter-butter-butter-sugar-sugar-sugar-egg-egg-egg": "batter",
    "batter-batter-batter-flour-flour-flour-flour-flour-flour": "cookieDough",
  })
);

export const combineMap = new Map(
  Object.entries({
    "flour--------": "sugar",
    "cake-candle------": "birthday cake",
    "cat-cat-cat------": "happy coots",
  })
);
const ingredients = ["flour", "egg", "sugar", "butter", "corn"];
const inbetween = ["batter", "dough", "cornDough", "cookieDough"];
const final = ["cake", "cookie", "pretzel", "cornBread"];

export default class Entity {
  icon = "";
  value = null;
  color = "";
  constructor(value) {
    this.icon = iconMap.get(value);
    this.value = value;
    if (ingredients.includes(value)) {
      this.color = "gray";
    } else if (inbetween.includes(value)) {
      this.color = "pink";
    } else if (final.includes(value)) {
      this.color = "yellow";
    } else {
      this.color = "";
    }
  }
}
