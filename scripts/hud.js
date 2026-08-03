import { MODULE_ID, FART_COOLDOWN, FU_COOLDOWN, FART_MESSAGES } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { unlockAchievement, unlockPlayerAchievement } from "./effects.js";

let lastFart = 0;
let lastFU = 0;

function randomItem(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

export function createHUD() {

  if (document.querySelector("#brfb-hud")) {
    return;
  }

  const hud = document.createElement("div");

  hud.id = "brfb-hud";

  const pos = game.settings.get(
    MODULE_ID,
    "hudPosition"
  );

  hud.style.left = `${pos.left}px`;
  hud.style.top = `${pos.top}px`;

  const collapsed = game.settings.get(
    MODULE_ID,
    "collapsed"
  );

  hud.innerHTML = `
    <div class="brfb-header">
      <span>Critical Buttons</span>
      <button class="brfb-toggle">
        ${collapsed ? "+" : "-"}
      </button>
    </div>

    <div class="brfb-content ${collapsed ? "collapsed" : ""}">

      <button class="brfb-fart">
        💨
      </button>

      <button class="brfb-fu">
        🖕
      </button>

    </div>
  `;

  document
    .querySelector("#interface")
    .appendChild(hud);

  activateListeners(hud);
  makeDraggable(hud);
}

function activateListeners(hud) {

  hud
    .querySelector(".brfb-fart")
    .addEventListener(
      "click",
      fartPressed
    );

  hud
    .querySelector(".brfb-fu")
    .addEventListener(
      "click",
      fuPressed
    );

  hud
    .querySelector(".brfb-toggle")
    .addEventListener(
      "click",
      () => toggleHUD(hud)
    );
}

async function fartPressed() {

  const remain = FART_COOLDOWN - (Date.now() - lastFart);

  if (remain > 0) {
    ui.notifications.warn(`Cooldown: ${Math.ceil(remain / 1000)}s`);
    return;
  }

  const selected = canvas.tokens.controlled;

  if (!selected.length) {
    ui.notifications.warn("Select at least one token.");
    return;
  }

  lastFart = Date.now();

  const payload = selected.map( token => ({ tokenId: token.id, message: randomItem(FART_MESSAGES) }) );

  await brfbSocket.executeForEveryone("playFartEffects", payload);
  await brfbSocket.executeAsGM("incrementFartCount", game.user);
}

async function fuPressed() {

  const remain = FU_COOLDOWN - (Date.now() - lastFU);

  if (remain > 0) { ui.notifications.warn(`Cooldown: ${Math.ceil(remain / 1000)}s`);
    return;
  }

  const selected = canvas.tokens.controlled;

  if (selected.length !== 1) {
    ui.notifications.warn("Select exactly one token.");
    return;
  }

  const targets = [...game.user.targets];

  if (!targets.length) {
    ui.notifications.warn("Target at least one token.");
    return;
  }

  const socket = game.modules.get(MODULE_ID)?.socket;

  if (!socket) {
    ui.notifications.error("Socket not available.");
    return;
  }

  lastFU = Date.now();

  await brfbSocket.executeForEveryone("playFUEffects", { sourceId: selected[0].id, targetIds: targets.map(t => t.id) });
  await brfbSocket.executeAsGM("incrementFUCount", game.user);
}

async function toggleHUD(hud) {

  const content =
    hud.querySelector(".brfb-content");

  content.classList.toggle(
    "collapsed"
  );

  const collapsed =
    content.classList.contains(
      "collapsed"
    );

  hud.classList.toggle(
    "brfb-collapsed",
    collapsed
  );

  await game.settings.set(
    MODULE_ID,
    "collapsed",
    collapsed
  );
}

function makeDraggable(hud) {

  const handle =
    hud.querySelector(
      ".brfb-header"
    );

  let drag = false;
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener(
    "pointerdown",
    event => {

      drag = true;

      offsetX =
        event.clientX -
        hud.offsetLeft;

      offsetY =
        event.clientY -
        hud.offsetTop;
    }
  );

  window.addEventListener(
    "pointermove",
    event => {

      if (!drag) return;

      hud.style.left =
        `${event.clientX - offsetX}px`;

      hud.style.top =
        `${event.clientY - offsetY}px`;
    }
  );

  window.addEventListener(
    "pointerup",
    async () => {

      if (!drag) return;

      drag = false;

      await game.settings.set(
        MODULE_ID,
        "hudPosition",
        {
          left: parseInt(
            hud.style.left
          ),
          top: parseInt(
            hud.style.top
          )
        }
      );
    }
  );
}