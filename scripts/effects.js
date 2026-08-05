import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";

export async function playGlobalSound(soundfile, volume=0.8, duration=null) {
  await foundry.audio.AudioHelper.play({src: `modules/${MODULE_ID}/sounds/${soundfile}`, volume: volume});
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