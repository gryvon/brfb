import { playFartEffects, playFUEffects, showAchievement } from "./effects.js";
import { incrementFartCount, incrementFUCount, lockPlayerAchievement } from "./counters.js";
import { MODULE_ID } from "./constants.js";

export let brfbSocket;

export function registerSocketHandlers() {

  brfbSocket = socketlib.registerModule(MODULE_ID);

  game.modules.get(MODULE_ID).socket = brfbSocket;

  brfbSocket.register("playFartEffects", playFartEffects);

  brfbSocket.register("playFUEffects", playFUEffects);

  brfbSocket.register("showAchievement", showAchievement);

  brfbSocket.register("incrementFartCount", incrementFartCount);

  brfbSocket.register("incrementFUCount", incrementFUCount);

  brfbSocket.register("lockPlayerAchievement", lockPlayerAchievement);
}