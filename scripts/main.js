import { MODULE_ID } from "./constants.js";
import { createHUD } from "./hud.js";
import { registerSocketHandlers, brfbSocket } from "./socket.js";
//import { unlockAchievement, unlockPlayerAchievement, hallOfShame, floatingText, playSound, sillyGoose, polkaNeverDies } from "./effects.js";
import { localHallOfShame } from "./hall_of_shame.js";
Hooks.once("init", () => {

  game.settings.register(
    MODULE_ID,
    "hudPosition",
    {
      scope: "client",
      config: false,
      type: Object,
      default: {
        left: 100,
        top: 100
      }
    }
  );

  game.settings.register(
    MODULE_ID,
    "collapsed",
    {
      scope: "client",
      config: false,
      type: Boolean,
      default: false
    }
  );

  game.settings.register(
    MODULE_ID,
    "playerAchievements",
    {
      scope: "world",
      config: false,
      type: Object,
      default: {}
    }
  );

  game.settings.register(
    MODULE_ID,
    "playerScores",
    {
      scope: "world",
      config: false,
      type: Object,
      default: {}
    }
  );

  game.settings.register(
    MODULE_ID,
    "globalScores",
    {
      scope: "world",
      config: false,
      type: Object,
      default: {}
    }
  );

});

Hooks.once("socketlib.ready", () => {
  registerSocketHandlers();
});

Hooks.once("ready", () => {
  createHUD();
});

Hooks.on("createChatMessage", async (message) => {

  if (!message.isRoll) return;

  const roll = message.rolls?.[0];
  if (!roll) return;

  const dice = roll.dice?.[0];
  if (!dice) return;

  const allMinus =
    dice.results.length === 4 &&
    dice.results.every(r => r.result === -1);

  if (allMinus) {
    await unlockPlayerAchievement(user, "rolled_like_shit", "TASK FAILED SUCCESSFULLY!", "Rolled - - - -")
  }

  const total = roll.total;

  // Poor Rolls Dresden Narrator Here.
 
});

Hooks.once("ready", () => {
  createHUD();
  globalThis.BRFB = { localHallOfShame };
  globalThis.BRFBSocket = brfbSocket;
});

