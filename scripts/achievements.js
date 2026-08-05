import { MODULE_ID, ACHIEVEMENTS } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { lockPlayerAchievement } from "./counters.js";
import { playLocalSound } from "./helpers.js";

export async function detectAchievements(userId) {

  const scores = game.settings.get(MODULE_ID, "playerScores");

  const userScores = scores[userId];

  if (!userScores) { return; }

  for (const [scoreName, achievements] of Object.entries(ACHIEVEMENTS)) {

    const value = userScores[scoreName] ?? 0;

    for (const achievement of achievements) {
      if (value >= achievement.value) {
        await requestAchievement(
          userId,
          achievement.tag,
          achievement.title,
          achievement.subtitle
        );
      }
    }
  }
}

export async function requestAchievement(userId, tag, title, subtitle) {
	const user = game.users.get(userId);
	if (!user) { return; }
	const achievements = await game.settings.get(MODULE_ID, "playerAchievements");
	if (!achievements) { console.log("No achievements!") }
	achievements[user.id] ??= [];
	if (achievements[user.id].includes(tag)) { return; }

	await brfbSocket.executeForEveryone("playAchievement", userId, title, subtitle);

	await lockPlayerAchievement(userId, tag);
}

export async function playAchievement(userId, title, subtitle) { 
	const user = game.users.get(userId);
	if (!user) { return; }
	// If the element already exists, remove it.
	const existing = document.querySelector("#brfb-achievement")
	if (existing) { existing.remove(); }

	const overlay = document.createElement("div");
	overlay.id = "brfb-achievement";
	overlay.innerHTML = `
		<div class="brfb-achievement-frame">
			<div class="brfb-achievement-header">
				🏆 ACHIEVEMENT UNLOCKED
			</div>
			<div class="brfb-achievement-user">
				${user.name}
			</div>
			<div class="brfb-achievement-title">
				${title}
			</div>
			<div class="brfb-achievement-subtitle">
				${subtitle}
			</div>
		</div>
	`;

	document.body.appendChild(overlay);

	// fadeOut
	setTimeout(() => { overlay.classList.add("brfb-achievement-hide"); }, 5000);

	// remove
	setTimeout(() => { overlay.remove(); }, 6000);

	await playLocalSound("achievement.mp3");
}