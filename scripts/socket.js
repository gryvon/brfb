import { floatingTextOnToken, playGlobalSound } from "./effects.js";
import { MODULE_ID } from "./constants.js";
import { incrementPlayerCount, incrementGlobalCount, lockPlayerAchievement } from "./counters.js";
import { requestFlatulence } from "./flatulence.js";
import { requestFU, playFU } from "./fu.js";
import { requestSillyGoose, playSillyGoose } from "./silly_goose.js";
import { requestPolka, polkaNeverDies } from "./polka.js";
import { requestAchievement, playAchievement } from "./achievements.js";
import { broadcastHallOfShame, showHallOfShame } from "./hall_of_shame.js";
import { playParkour } from "./parkour.js";
import { requestSkillIssue, playSkillIssue } from "./skill_issue.js";

export let brfbSocket;

export function registerSocketHandlers() {

  brfbSocket = socketlib.registerModule(MODULE_ID);

  game.modules.get(MODULE_ID).socket = brfbSocket;

  // Common

  brfbSocket.register("floatingTextOnToken", floatingTextOnToken);
  brfbSocket.register("playGlobalSound", playGlobalSound);
  brfbSocket.register("lockPlayerAchievement", lockPlayerAchievement);

  // Counters - Shouldn't be necessary anymore.

  brfbSocket.register("incrementPlayerCount", incrementPlayerCount);
  brfbSocket.register("incrementGlobalCount", incrementGlobalCount);

  // Flatulence

  brfbSocket.register("requestFlatulence", requestFlatulence);
  
  // F.U.

  brfbSocket.register("requestFU", requestFU);
  brfbSocket.register("playFU", playFU);

  // Silly Goose

  brfbSocket.register("requestSillyGoose", requestSillyGoose);
  brfbSocket.register("playSillyGoose", playSillyGoose);

  // Polka Never Dies!!!

  brfbSocket.register("requestPolka", requestPolka);
  brfbSocket.register("polkaNeverDies", polkaNeverDies);

  // New Achievement!

  brfbSocket.register("requestAchievement", requestAchievement);
  brfbSocket.register("playAchievement", playAchievement);

  // Hall of Shame
  brfbSocket.register("broadcastHallOfShame", broadcastHallOfShame);
  brfbSocket.register("showHallOfShame", showHallOfShame);

  // Parkour!
  brfbSocket.register("playParkour", playParkour);

  // Skill Issue
  brfbSocket.register("requestSkillIssue", requestSkillIssue);
  brfbSocket.register("playSkillIssue", playSkillIssue);

}