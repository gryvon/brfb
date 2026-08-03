import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { unlockAchievement, unlockPlayerAchievement } from "./effects.js";

export async function incrementFartCount(user) {

	const scores = game.settings.get(MODULE_ID, "playerScores");
	scores[user._id] ??= {};
	const count = scores[user._id].fart_count ?? 0;
    const newCount = count + 1;

//    if (newCount === 1) {
//        await unlockPlayerAchievement(user, "fart_canon", "Canon Event", "The First Fart");
//    }

    if (newCount === 50) {
        await unlockPlayerAchievement(user, "fart_50", "Session Recap", "50 Farts Released");
    }

    if (newCount === 100) {
        await unlockPlayerAchievement(user, "fart_100", "Chemical Warfare", "100 Farts Released");
    }

    scores[user._id].fart_count = newCount;

    await game.settings.set(MODULE_ID, "playerScores", scores);
}

export async function incrementFUCount(user) {

	const scores = game.settings.get(MODULE_ID, "playerScores");
	scores[user._id] ??= {};
	const count = scores[user._id].fu_count ?? 0;
    const newCount = count + 1;

//    if (newCount === 1) {
//        await unlockPlayerAchievement(user, "fu_canon", "Canon Event", "The First FUCK YOU!");
//    }

    if (newCount === 10) {
        await unlockPlayerAchievement(user, "fu_10", "Minor Talent", "10 FUCK YOUs!");
    }

    if (newCount === 50) {
        await unlockPlayerAchievement(user, "fu_50", "Professional Hater", "50 FUCK YOUs!");
    }

    if (newCount === 100) {
        await unlockPlayerAchievement(user, "fu_100", "Hatred Is A Craft", "100 FUCK YOUs!");
    }

    scores[user._id].fu_count = newCount;

    await game.settings.set(MODULE_ID, "playerScores", scores);
}

export async function lockPlayerAchievement(user, tag) {
	console.log("User", user);
	const achievements = game.settings.get(MODULE_ID, "playerAchievements");
	const userId = user._id;
	achievements[userId] ??= []

	if (achievements[userId].includes(tag)) { return; }

	achievements[userId].push(tag);

	await game.settings.set(MODULE_ID, "playerAchievements", achievements);
}