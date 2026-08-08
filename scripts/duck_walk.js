import { MODULE_ID} from "./constants.js";
import { brfbSocket } from "./socket.js";
import { playLocalSound } from "./helpers.js";

export async function spawnDuck() {
  const existing = document.querySelector("#brfb-duck");
  if (existing) { existing.remove(); }
  const overlay = document.createElement("img");
  overlay.id = "brfb-duck";
  overlay.src = `modules/${MODULE_ID}/assets/duck.gif`;
  document.body.appendChild(overlay);
  playLocalSound("duck_song.mp3");
  setTimeout(() => { overlay.remove(); }, 24000);
}

export function startDuckTimer() {
	scheduleDuck();
}

function scheduleDuck() {
  console.log("The duck is watching...");
  const waitMinutes = 90 + Math.random() * 30;

  const waitMs = waitMinutes * 60 * 1000;

setTimeout(async () => {
  const duckEnabled = game.settings.get(MODULE_ID, "duckEnabled");
  if (duckEnabled) { await spawnDuck(); }
  scheduleDuck();
  }, waitMs);
}

export async function toggleDuck() {
	let duckEnabled = game.settings.get(MODULE_ID, "duckEnabled");
	duckEnabled = !duckEnabled;
	await game.settings.set(MODULE_ID, "duckEnabled", duckEnabled);
}

export async function requestToggleDuck() { 
	await brfbSocket.executeAsGM("toggleDuck");
}

export async function requestSpawnDuck() {
	await brfbSocket.executeForEveryone("spawnDuck");
}