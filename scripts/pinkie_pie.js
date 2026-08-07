import { MODULE_ID} from "./constants.js";
import { brfbSocket } from "./socket.js";

export async function pinkiePie() {
  const startLeft = Math.random() < 0.5;

  const height = Math.floor(20 + Math.random() * 60);

  const overlay = document.createElement("img");

  const maxTop = window.innerHeight - 440;

  const top = Math.floor(Math.random() * maxTop);

  await brfbSocket.executeForEveryone("playPinkiePie", startLeft, top);
}

export async function playPinkiePie(startLeft, top) {

  const existing = document.querySelector("#brfb-pinkie");

  if (existing) {
    existing.remove();
    return;
  }

//  const startLeft = Math.random() < 0.5;

  const height = Math.floor(20 + Math.random() * 60);

  const overlay = document.createElement("img");

//  const maxTop = window.innerHeight - 440;

//  const top = Math.floor(Math.random() * maxTop);

  overlay.id = "brfb-pinkie";

  overlay.src = `modules/${MODULE_ID}/assets/pinkie_pie.gif?t=${Date.now()}`;
  
  overlay.style.position = "fixed";

  overlay.style.top = `${top}px`;

  overlay.style.zIndex = "999999";

  overlay.style.pointerEvents = "none";

  if (startLeft) {
    overlay.style.left = "0";
    overlay.style.transform = "scaleX(-1)";
  } else {
    overlay.style.right = "0";
  }

  document.body.appendChild(overlay);

  setTimeout(() => { overlay.remove(); }, 4500); // length of gif
}