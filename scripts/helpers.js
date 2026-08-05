import { MODULE_ID } from "./constants.js";

export function getTokensByTokenRadius(tokenId, squares = 4) {
  const sourceToken = canvas.tokens.get(tokenId);
  if (!sourceToken) { return []; }
  const radius = canvas.dimensions.size * squares;
  const nearbyTokens = canvas.tokens.placeables.filter(token => {
    if (token.id === sourceToken.id) { return false; }
    const dx = sourceToken.center.x - token.center.x;
    const dy = sourceToken.center.y - token.center.y;
    const distance = Math.hypot(dx, dy);
    return distance <= radius;
  })
  return nearbyTokens;
}

export async function floatingTextOnToken(tokenId, text, duration = 4000, color = "#ffffff", bounce = false) {

  const token = canvas.tokens.get(tokenId);

  if (!token) return;

  let effect = new Sequence()
    .effect()
    .text(text, {
      fill: color,
      stroke: "#000000",
      strokeThickness: 2
    })
    .attachTo(token, {
      offset: {
        y: -canvas.dimensions.size * 0.75
      },
      bindRotation: false
    })
    .duration(duration)
    .fadeIn(250)
    .fadeOut(500);

  if (bounce) {

    effect = effect.loopProperty(
      "sprite",
      "position.y",
      {
        values: [0, -10, 0, -10, 0],
        duration: 750
      }
    );
  }

  await effect.play();
}

export async function playLocalSound(soundfile, volume=0.8, duration=null) {
  try {
    const sound = await foundry.audio.AudioHelper.play({src: `modules/${MODULE_ID}/sounds/${soundfile}`, volume});
    if (duration) {
      setTimeout(() => { sound.stop(); }, duration);
    }
  } catch(err) {
    ui.notifications.error(`BRFB Sound Error: ${err}`);
  }
}

export function getTokenOwners(tokenId) {
  const token = canvas.tokens.get(tokenId);
  if (!token) { return []; }

  const actor = token.actor;

  if (!actor) return [];

  const owners = game.users.filter(
    user =>
      !user.isGM &&
      actor.testUserPermission(
        user,
        CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
      )
  );  

  return owners;
}

export function getPlayerOwnedTokens(tokenIds) {
  return tokenIds.map(id => canvas.tokens.get(id)).filter(token => token && getTokenOwners(token.id).length > 0);
}

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms) );
}
