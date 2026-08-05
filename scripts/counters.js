import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { detectAchievements } from "./achievements.js";

//import { unlockAchievement, unlockPlayerAchievement } from "./effects.js";

export async function incrementPlayerCount(userId, score) {
    const user = game.users.get(userId);
    if (!user) { return; }
    const scores = game.settings.get(MODULE_ID, "playerScores");
    scores[user.id] ??= {};
    const count = scores[user._id][score] ?? 0;
    const newCount = count + 1;
    scores[user._id][score] = newCount;
    await game.settings.set(MODULE_ID, "playerScores", scores);
    await detectAchievements(userId);
    return newCount;
}

export async function incrementGlobalCount(score) {
    const scores = game.settings.get(MODULE_ID, "globalScores");
    scores[user.id] ??= {};
    const count = scores[score] ?? 0;
    const newCount = count + 1;
    scores[score] = newCount;
    await game.settings.set(MODULE_ID, "globalScores", scores);
    return newCount;
}

export async function lockPlayerAchievement(userId, tag) {
    const user = game.users.get(userId);
    if (!user) { return; }
    const achievements = game.settings.get(MODULE_ID, "playerAchievements");
    achievements[userId] ??= []

    if (achievements[userId].includes(tag)) { return; }

    achievements[userId].push(tag);

    await game.settings.set(MODULE_ID, "playerAchievements", achievements);
}