import { useEffect, useState } from "react";
import * as iconAssets from "./assets/iconAssets";
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
  GiCorn,
  GiBreadSlice,
  GiHollowCat,
  GiFeline,
} from "react-icons/gi";

export const iconMap = new Map(
  Object.entries({
    egg: <img className="icon-img" src={iconAssets.egg} />,
    flour: <img className="icon-img" src={iconAssets.flour} />,
    ash: <img className="icon-img" src={iconAssets.ash} />,
    dough: <img className="icon-img" src={iconAssets.dough} />,
    batter: <img className="icon-img" src={iconAssets.batter} />,
    sugar: <img className="icon-img" src={iconAssets.sugar} />,
    cake: <GiStairsCake />,
    catfood: <img className="icon-img" src={iconAssets.catfood} />,
    butter: <img className="icon-img" src={iconAssets.butter} />,
    cookie: <GiCookie />,
    cookieDough: <img className="icon-img" src={iconAssets.cookieDough} />,
    bread: <img className="icon-img" src={iconAssets.bread} />,
    corn: <img className="icon-img" src={iconAssets.corn} />,
    cornBread: <GiBreadSlice />,
    birthdaycake: <HiCake />,
    fish: <img className="icon-img" src={iconAssets.fish} />,
  })
);

export const bakeMap = new Map(
  Object.entries({
    batter: "cake",
    cookieDough: "cookie",
    dough: "bread",
  })
);

export const mixerMap = new Map(
  Object.entries({
    "egg-egg-egg-flour-flour-flour-flour-flour-flour": "dough",
    "flour-flour-flour-egg-egg-egg-flour-flour-flour": "dough",
    "flour-flour-flour-flour-flour-flour-egg-egg-egg": "dough",
    "flour-flour-flour-egg-egg-egg-sugar-sugar-sugar": "batter",
    "sugar-sugar-sugar-egg-egg-egg-flour-flour-flour": "batter",
    "butter-butter-butter-sugar-sugar-sugar-egg-egg-egg": "batter",
    "batter-batter-batter-flour-flour-flour-flour-flour-flour": "cookieDough",
  })
);

export const combineMap = new Map(
  Object.entries({
    "flour--------": "sugar",
    "cake-candle------": "birthdaycake",
    "cat-cat-cat------": "happycoots",
  })
);
const ingredients = ["flour", "egg", "sugar", "butter", "corn"];
const inbetween = ["batter", "dough", "cornDough", "cookieDough"];
const final = ["cake", "cookie", "bread", "cornBread"];

export default class Entity {
  icon = null;
  value = null;
  fresh = true;
  constructor(value) {
    this.value = value;
  }

  unfresh() {
    this.fresh = false;
  }
}



export function EntityIcon({ entity }) {
  if (!entity?.value) return <></>;

  const icon = iconMap.get(entity.value);
  return <div
    className={`flex items-center ${entity.fresh ? "fresh" : ""}`}
  >
    {icon}
  </div>;
}