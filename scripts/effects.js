import {
  FART_MESSAGES,
  FART_SOUNDS,
  FU_SOUNDS,
  MODULE_ID
} from "./constants.js";

import { brfbSocket } from "./socket.js";

const fart_sound = randomItem(FART_SOUNDS);
const fu_sound = randomItem(FU_SOUNDS)

export async function playFartEffects(payload) {

  const sound = randomItem(FART_SOUNDS);

  await foundry.audio.AudioHelper.play({src: sound, volume: 0.8});

  for (const fart of payload) {
    const token = canvas.tokens.get(fart.tokenId);

    if (!token) continue;

    await createGasCloud(token);

    broadcastBubble(token, fart.message);
  }
}

export async function playFUEffects(
  data
) {

  await foundry.audio.AudioHelper.play({
    src: fu_sound,
    volume: 0.8,
    autoplay: true,
    loop: false
  });

  const source =
    canvas.tokens.get(
      data.sourceId
    );

  if (!source) {
    return;
  }

  for (const id of data.targetIds) {

    const target =
      canvas.tokens.get(id);

    if (!target) continue;

    await fireMiddleFinger(
      source,
      target
    );
  }
}

function broadcastBubble(token, text) {

canvas.interface.createScrollingText(
  token.center,
  text,
  {
    anchor: CONST.TEXT_ANCHOR_POINTS.TOP,
    direction: CONST.TEXT_ANCHOR_POINTS.TOP,

    fontSize: 24,
    fill: "#b8c46a",          // Sickly fart yellow-green
    stroke: "#000000",
    strokeThickness: 6,

    duration: 4000
  }
);
}

async function createGasCloud(token) {

new Sequence()
  .effect()
  .file("jb2a.smoke.puff.ring.01.white")
  .attachTo(token)
  .tint("#6B5B3E")
  .opacity(0.65)
  .scale(3.0)
  .fadeIn(0)
  .fadeOut(0)
  .duration(1067)
  .play(); 

}

async function fireMiddleFinger(source, target) {

await new Sequence()

  // Projectile
  .effect()
  .file(
    "modules/big-red-fart-button/assets/middle-finger.png"
  )
  .atLocation(source)
  .moveTowards(target)
  .scaleToObject(0.75)
  .scaleIn(0.01, 200)
  .scaleOut(1, 200)
  .animateProperty(
    "spriteContainer",
    "rotation",
    {
      from: 0,
      to: 1800,
      duration: 1200
    }
  )
  .duration(1200)

  .waitUntilFinished()

  // Impact
.effect()
.file(
  "modules/big-red-fart-button/assets/middle-finger.png"
)
.atLocation(target)
//.spriteRotation(-90)
.scaleToObject(0.75)

.loopProperty(
  "sprite",
  "scale.x",
  {
    values: [1, 1.4, 1, 1.4, 1],
    duration: 1000
  }
)

.loopProperty(
  "sprite",
  "scale.y",
  {
    values: [1, 1.4, 1, 1.4, 1],
    duration: 1000
  }
)

.duration(3600)
.play();
}

function randomFartMessage() {

  return FART_MESSAGES[
    Math.floor(
      Math.random() *
      FART_MESSAGES.length
    )
  ];
}

function randomItem(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

export async function unlockAchievement(tag, title, subtitle) {
  const unlocked = game.settings.get(MODULE_ID, "fartAchievements")

  if (unlocked.includes(tag)) {
    return; // This tag has already been unlocked.
  }

  const data = {'title': title, 'subtitle': subtitle}
  
  await brfbSocket.executeForEveryone("showAchievement", data);

  unlocked.push(tag);

  await game.settings.set(
    MODULE_ID,
    "fartAchievements",
    unlocked
  );

}

export async function unlockPlayerAchievement(user, tag, title, subtitle) {

  const achievements = game.settings.get(MODULE_ID, "playerAchievements");
  achievements[user._id] ??= []
  if (achievements[user._id].includes(tag)) { return; }

  const data = {'title': title, 'subtitle': subtitle, 'user': user}

  await brfbSocket.executeForEveryone("showAchievement", data);
  await brfbSocket.executeAsGM("lockPlayerAchievement", user, tag);
}

export async function showAchievement(data) {

  const user = data.user ?? null;

  const existing =
    document.querySelector(
      "#brfb-achievement"
    );

  if (existing) {
    existing.remove();
  }

  const overlay =
    document.createElement("div");

  overlay.id = "brfb-achievement";

  overlay.innerHTML = `
    <div class="brfb-achievement-frame">

      <div class="brfb-achievement-header">
        ACHIEVEMENT UNLOCKED
      </div>

      ${
        user
          ? `<div class="brfb-achievement-user">${user.name}</div>`
          : ""
      }

      <div class="brfb-achievement-title">
        ${data.title}
      </div>

      <div class="brfb-achievement-subtitle">
        ${data.subtitle}
      </div>

    </div>
  `;

  document.body.appendChild(
    overlay
  );

  setTimeout(() => {
    overlay.classList.add(
      "brfb-achievement-hide"
    );
  }, 3500);

  setTimeout(() => {
    overlay.remove();
  }, 30000);

  await foundry.audio.AudioHelper.play({
  src: "modules/big-red-fart-button/sounds/achievement.mp3",
  volume: 0.7
  });
}