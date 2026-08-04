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
        await unlockPlayerAchievement(user, "fart_50", "Session Recrap", "50 Farts Released");
    }

    if (newCount === 100) {
        await unlockPlayerAchievement(user, "fart_100", "Chemical Warfare", "100 Farts Released");
    }

    scores[user._id].fart_count = newCount;

    await game.settings.set(MODULE_ID, "playerScores", scores);
}

export async function incrementCropDustCount(tokenIds) {
    const sourceTokens = tokenIds.map(id => canvas.tokens.get(id)).filter(Boolean);

    const scores = game.settings.get(MODULE_ID, "playerScores");

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
            const actor = target.actor;
            if (!actor) continue;
            const users = game.users.filter(user => !user.isGM && actor.testUserPermission(user, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER));
            for (const user of users) {
              scores[user.id] ??= {};
              const count = scores[user.id].crop_dusted_count ?? 0;

              scores[user.id].crop_dusted_count = count + 1;
            }
        }
    }

    await game.settings.set(MODULE_ID, "playerScores", scores);
}

export async function incrementFUVictimCount(targets) {

    const scores =
        game.settings.get(
            MODULE_ID,
            "playerScores"
        );

    for (const target of targets) {

        const actor = target.actor;

        if (!actor) continue;

        const owningUsers = game.users.filter(
            user =>
                !user.isGM &&
                actor.testUserPermission(
                    user,
                    CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
                )
        );

        if (!owningUsers.length) {
            continue; // NPC
        }

        for (const user of owningUsers) {

            scores[user.id] ??= {};

            const count =
                scores[user.id]
                    .fu_victim_count ?? 0;

            const newCount =
                count + 1;

            // Achievements later

            scores[user.id]
                .fu_victim_count = newCount;
        }
    }

    await game.settings.set(
        MODULE_ID,
        "playerScores",
        scores
    );
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