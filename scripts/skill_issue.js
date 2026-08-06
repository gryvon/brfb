import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { playLocalSound, floatingTextOnToken, getTokenOwners } from "./helpers.js";
import { incrementPlayerCount } from "./counters.js";


export async function playSkillIssue(tokenId) {
	const token = canvas.tokens.get(tokenId);
	if (!token) { return; }
	await playLocalSound("skill_issue.mp3");
	await floatingTextOnToken(tokenId, "🎲 SKILL ISSUE 🎲", 300000, "#FF0000", false);
}

export async function requestSkillIssue(tokenId) {
	await brfbSocket.executeForEveryone("playSkillIssue", tokenId);
	const users = getTokenOwners(tokenId);
	for (const user of users) {
		await incrementPlayerCount(user.id, "silly_goose_count");
	}
}
