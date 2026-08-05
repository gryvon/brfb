import { MODULE_ID} from "./constants.js";
import { brfbSocket } from "./socket.js";
import { incrementPlayerCount } from "./counters.js";
import { playLocalSound, floatingTextOnToken, getTokenOwners, wait } from "./helpers.js";

export async function polkaNeverDies(tokenId) {
	const token = canvas.tokens.get(tokenId);
	if (!token) { return; }
	await playLocalSound("polka.mp3");
	await floatingTextOnToken(token.id, "🎺 POLKA WILL NEVER DIE! 🎺", 8000, "#cc33ff", true)	
	
	// Polka Dance!
	const mesh = token.mesh ?? token;
	const startX = mesh.x;
	const startY = mesh.y;
	const start = Date.now();
	const duration = 8000;
	while (Date.now() - start < duration) {
		const t = (Date.now() - start) / 1000;
		mesh.x = startX + Math.sin(t * 8) * 8;
		mesh.y = startY - Math.abs(Math.sin(t * 16)) * 6;
		await wait(16);
	}

	mesh.x = startX;
	mesh.y = startY;
}

export async function requestPolka(tokenId) {
	const token = canvas.tokens.get(tokenId);
	if (!token) { return; }
	await brfbSocket.executeForEveryone("polkaNeverDies", tokenId);
	const users = getTokenOwners(token.id);
	for (const user of users) {
		await incrementPlayerCount(user.id, "polka_count");
	}
}