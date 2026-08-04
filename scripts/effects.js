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
    fill: "#b8c46a",
    stroke: "#000000",
    strokeThickness: 6,

    duration: 8000
  }
);
}

async function createGasCloud(token) {

new Sequence()
  .effect()
  .file("jb2a.smoke.puff.ring.01.white")
  .attachTo(token)
  .tint("#6B5B3E") // aka "fart brown"
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
    `modules/${MODULE_ID}/assets/middle-finger.png`
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
  `modules/${MODULE_ID}/assets/middle-finger.png`
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

  const existing = document.querySelector("#brfb-achievement");

  if (existing) { existing.remove(); }

  const overlay = document.createElement("div");

  overlay.id = "brfb-achievement";

  overlay.innerHTML = `
    <div class="brfb-achievement-frame">

      <div class="brfb-achievement-header">
        🏆 ACHIEVEMENT UNLOCKED
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
  }, 5000);

  setTimeout(() => {
    overlay.remove();
  }, 6000);

  await foundry.audio.AudioHelper.play({
  src: `modules/${MODULE_ID}/sounds/achievement.mp3`,
  volume: 0.7
  });
}

export async function cropDust(tokenIds) {
  const sourceTokens = tokenIds.map(id => canvas.tokens.get(id)).filter(Boolean);

  let users = [];

  for (const sourceToken of sourceTokens) {
      const radius = canvas.dimensions.size * 4;
      const nearbyTokens = canvas.tokens.placeables.filter(token => {
        if (token.id === sourceToken.id) { return false; }
        const dx = sourceToken.center.x - token.center.x;
        const dy = sourceToken.center.y - token.center.y;
        const distance = Math.hypot(dx, dy);
        return distance <= radius;
    });    

    for (const target of nearbyTokens) {
      const reaction = randomItem(["🤢","😷","💀","🤮","😠","☣️"]);
      canvas.interface.createScrollingText(target.center, reaction, { anchor: CONST.TEXT_ANCHOR_POINTS.TOP, duration: 5000 });
    }
  }
}

export async function showHallOfShame(data) {

  const existing =
    document.querySelector(
      "#brfb-hall-of-shame"
    );

  if (existing) {
    existing.remove();
  }

  const overlay =
    document.createElement("div");

  overlay.id =
    "brfb-hall-of-shame";

overlay.innerHTML = `

  <div class="brfb-hos-frame">

    <div class="brfb-hos-title">
      🏆 HALL OF SHAME 🏆
    </div>

    <div class="brfb-hos-grid">

      <div class="brfb-hos-section">
        <div class="brfb-hos-header">
          💨 Greatest Flatulence
        </div>

        ${data.farters}
      </div>

      <div class="brfb-hos-section">
        <div class="brfb-hos-header">
          🦨 Most Crop Dusted
        </div>

        ${data.crop_dusted}
      </div>

      <div class="brfb-hos-section">
        <div class="brfb-hos-header">
          🖕 Professional Haters
        </div>

        ${data.haters}
      </div>

      <div class="brfb-hos-section">
        <div class="brfb-hos-header">
          😡 Most Victimized
        </div>

        ${data.victims}
      </div>

    </div>

    <div class="brfb-hos-footer">
      ${data.commentary}
    </div>

  </div>
`;

  await foundry.audio.AudioHelper.play({
    src: `modules/${MODULE_ID}/sounds/hall-of-shame.mp3`,
    volume: 0.8
  });

  document.body.appendChild(
    overlay
  );

  overlay.addEventListener(
    "click",
    () => {

      overlay.classList.add(
        "brfb-hos-hide"
      );

      setTimeout(() => {
        overlay.remove();
      }, 500);
    }
  );
}

export async function hallOfShame() {

  const scores =
    game.settings.get(
      MODULE_ID,
      "playerScores"
    );

  const farters = [];
  const haters = [];
  const victims = [];
  const crop_dusted = [];

  for (const [userId, stats] of Object.entries(scores)) {

    const user =
      game.users.get(userId);

    const name =
      user?.name ?? "Unknown Degenerate";

    farters.push({ name, value: stats.fart_count ?? 0 });

    haters.push({ name, value: stats.fu_count ?? 0 });

    victims.push({ name, value: stats.fu_victim_count ?? 0});

    crop_dusted.push({ name, value: stats.crop_dusted_count ?? 0});
  }

  farters.sort( (a, b) => b.value - a.value );

  haters.sort((a, b) => b.value - a.value );

  victims.sort((a, b) => b.value - a.value );

  crop_dusted.sort((a, b) => b.value - a.value );

  const data = {
    farters: makeRows(farters.slice(0, 10)),

    haters: makeRows(haters.slice(0, 10)),

    victims: makeRows(victims.slice(0, 10)),

    crop_dusted: makeRows(crop_dusted.slice(0, 10)),

    commentary: randomItem([
      "The White Council is deeply concerned.",
      "History will judge you.",
      "The atmosphere deserves compensation.",
      "Several crimes have occurred.",
      "The numbers speak for themselves.",
      "Mouse is disappointed.",
      "Mab would like a word.",
      "This is now part of the public record."
    ])
  };

  await brfbSocket.executeForEveryone("showHallOfShame", data);
}

function makeRows(entries) {

  return entries
    .map((entry, index) => `

      <div class="brfb-hos-row">

        <span class="brfb-hos-name">
          ${index + 1}. ${entry.name}
        </span>

        <span class="brfb-hos-value">
          ${entry.value}
        </span>

      </div>

    `)
    .join("");
}