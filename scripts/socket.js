import { playFartEffects, playFUEffects, showAchievement, showHallOfShame, cropDust, floatingTextOnToken, playGlobalSound } from "./effects.js";
import { incrementFartCount, incrementFUCount, lockPlayerAchievement, incrementFUVictimCount, incrementCropDustCount } from "./counters.js";
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

  brfbSocket.register("showHallOfShame", showHallOfShame);

  brfbSocket.register("incrementFUVictimCount", incrementFUVictimCount);

  brfbSocket.register("cropDust", cropDust);

  brfbSocket.register("incrementCropDustCount", incrementCropDustCount);

  brfbSocket.register("floatingTextOnToken", floatingTextOnToken);

  brfbSocket.register("playGlobalSound", playGlobalSound);
}