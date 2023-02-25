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
    "egg": <img className="icon-img" src={iconAssets.egg} />,
    "flour": <img className="icon-img" src={iconAssets.flour} />,
    "ash": <img className="icon-img" src={iconAssets.ash} />,
    "dough": <img className="icon-img" src={iconAssets.dough} />,
    "batter": <img className="icon-img" src={iconAssets.batter} />,
    "sugar": <img className="icon-img" src={iconAssets.sugar} />,
    "cake": <GiStairsCake />,
    "catfood": <img className="icon-img" src={iconAssets.catfood} />,
    "butter": <img className="icon-img" src={iconAssets.butter} />,
    "cookie": <GiCookie />,
    "cookie dough": <img className="icon-img" src={iconAssets.cookieDough} />,
    "bread": <img className="icon-img" src={iconAssets.bread} />,
    "corn": <img className="icon-img" src={iconAssets.corn} />,
    "cornbread": <GiBreadSlice />,
    "birthday cake": <HiCake />,
    "fish": <img className="icon-img" src={iconAssets.fish} />,
  })
);

export const bakeMap = new Map(
  Object.entries({
    batter: "cake",
    "cookie dough": "cookie",
    dough: "bread",
  })
);

export const mixerMap = new Map(
  Object.entries({
    "-egg---egg--flour-flour-flour": "dough",
    "egg--flour----flour--egg": "dough",
    "flour--egg----egg--flour": "dough",
    "egg--egg----egg--flour": "dough",
    "egg--egg----flour--egg": "dough",
    "egg--flour----egg--egg": "dough",
    "flour--egg----egg--egg": "dough",
    "flour--flour----flour--egg": "dough",
    "flour--flour----egg--flour": "dough",
    "flour--egg----flour--flour": "dough",
    "egg--flour----flour--flour": "dough",

    "-----corn---bread": "cornbread",
    "----corn---bread-": "cornbread",
    "---corn---bread--": "cornbread",
    "--corn---bread---": "cornbread",
    "-corn---bread----": "cornbread",
    "corn---bread-----": "cornbread",

    "fish---fish---fish--": "catfood",
    "-fish---fish---fish-": "catfood",
    "--fish---fish---fish": "catfood",
    "fish-fish-fish------": "catfood",
    "---fish-fish-fish---": "catfood",
    "------fish-fish-fish": "catfood",
    

    "flour-flour-flour-egg-egg--sugar-sugar-sugar": "batter",
    "flour-flour-flour--egg-egg-sugar-sugar-sugar": "batter",

    "sugar-sugar-butter-sugar-batter-egg-sugar-sugar-egg": "cookie dough",
    "sugar-sugar-egg-sugar-batter-butter-sugar-sugar-egg": "cookie dough",
    "sugar-sugar-egg-sugar-batter-egg-sugar-sugar-butter": "cookie dough",
  })
);

export const combineMap = new Map(
  Object.entries({
    "flour--------": "sugar",
    "cake-candle------": "birthdaycake",
    "cat-cat-cat------": "happycoots",
  })
);
let idCount = 1;

export default class Entity {
  value = null;
  fresh = true;
  id = idCount++;
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
    className={`relative flex items-center ${entity.fresh ? "fresh" : ""}`}
  >
    {icon}
  </div>;
}