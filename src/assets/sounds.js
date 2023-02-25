import meow from "./sfx/meow.mp3"
import purr from "./sfx/purr.mp3"
import rage from "./sfx/rage.mp3"
import ding from "./sfx/ding.mp3"
import bg from "./sfx/bg.mp3"

const meowSound = new Audio(meow)
const purrSound = new Audio(purr)
const rageSound = new Audio(rage)
const dingSound = new Audio(ding)
const bgSong = new Audio(bg)

export {
  meowSound,
  purrSound,
  rageSound,
  dingSound,
  bgSong,
}