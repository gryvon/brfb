import { MODULE_ID, FART_COOLDOWN, FU_COOLDOWN, FART_MESSAGES } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { requestParkour } from "./parkour.js";

let COOLDOWN = 15000;
let lastPressed = 0;

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

      <button title="Big Red Fart Button" class="brfb-hud-button brfb-fart">
        💨
      </button>

      <button title="Fuck you!" class="brfb-hud-button brfb-fu">
        🖕
      </button>

      <button title="Silly Goose" class="brfb-hud-button brfb-goose">
        🪿
      </button>

      <button title="Polka!" class="brfb-hud-button brfb-polka">
        🎺
      </button>

      <button title="Parkour!" class="brfb-hud-button brfb-parkour">
        🏃
      </button>

      <button title="Hall of Shame" class="brfb-hud-button brfb-shame">
        🏆
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

  hud.querySelector(".brfb-fart").addEventListener("click", fartPressed);

  hud.querySelector(".brfb-fu").addEventListener("click", fuPressed);

  hud.querySelector(".brfb-goose").addEventListener("click", goosePressed);

  hud.querySelector(".brfb-polka").addEventListener("click", polkaPressed);

  hud.querySelector(".brfb-parkour").addEventListener("click", parkourPressed);

  hud.querySelector(".brfb-shame").addEventListener("click", shamePressed);

  hud.querySelector(".brfb-toggle").addEventListener("click",() => toggleHUD(hud));
}

function cooldown() {

  const remain = COOLDOWN - (Date.now() - lastPressed);

  if (remain > 0) {
    ui.notifications.warn(`Cooldown: ${Math.ceil(remain / 1000)}s`);
    return true;
  }

  lastPressed = Date.now();

  return false;
}

async function fartPressed() {

  const selected = canvas.tokens.controlled;

  if (!selected.length) {
    ui.notifications.warn("Select at least one token.");
    return;
  }

  if (cooldown()) return;

  const selectedTokenIds = canvas.tokens.controlled.map(token => token.id);

  await brfbSocket.executeAsGM("requestFlatulence", selectedTokenIds);
}

async function fuPressed() {
  const selected = canvas.tokens.controlled;
  if (selected.length !== 1) {
    ui.notifications.warn("Select exactly one token.");
    return;
  }

  const selectedToken = selected[0];

  const targets = [...game.user.targets];

  if (!targets.length) {
    ui.notifications.warn("Target at least one token.");
    return;
  }

  if (cooldown()) return;

  const targetedTokenIds = targets.map(token => token.id);

  await brfbSocket.executeAsGM("requestFU", selectedToken.id, targetedTokenIds);

}

async function goosePressed() {

  const selected = canvas.tokens.controlled;

  if (selected.length !== 1) {
    ui.notifications.warn("Select exactly one token.");
    return;
  }

  if (cooldown()) return;

  await brfbSocket.executeAsGM("requestSillyGoose", selected[0].id);
}

async function polkaPressed() {

  const selected = canvas.tokens.controlled;

  if (selected.length !== 1) {
    ui.notifications.warn("Select exactly one token.");
    return;
  }

  if (cooldown()) return;

  await brfbSocket.executeAsGM("requestPolka", selected[0].id);

}

async function parkourPressed() {

  const selected = canvas.tokens.controlled;

  if (selected.length !== 1) {
    ui.notifications.warn("Select exactly one token.");
    return;
  }

  if (cooldown()) return;

  await requestParkour(selected[0].id);

}

async function shamePressed() {
  if (game.user.isGM) {
    await brfbSocket.executeAsGM("broadcastHallOfShame");
  }
  else {
    await BRFB.localHallOfShame();
  }
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