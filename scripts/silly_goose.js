import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { playLocalSound, floatingTextOnToken, getTokenOwners } from "./helpers.js";
import { incrementPlayerCount } from "./counters.js";


export async function playSillyGoose(tokenId) {
	const token = canvas.tokens.get(tokenId);
	if (!token) { return; }
	await playLocalSound("goose_honk.mp3");
	await floatingTextOnToken(tokenId, "🪿", 15000)
}

export async function requestSillyGoose(tokenId) {
	await brfbSocket.executeForEveryone("playSillyGoose", tokenId);
	const users = getTokenOwners(tokenId);
	for (const user of users) {
		await incrementPlayerCount(user.id, "silly_goose_count");
	}
}
