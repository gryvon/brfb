import { FART_MESSAGES, FART_SOUNDS, MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { playLocalSound, floatingTextOnToken, getTokensByTokenRadius, getTokenOwners, randomItem } from "./helpers.js";
import { incrementPlayerCount } from "./counters.js";

async function playFartSound(sound) {
	await playLocalSound(sound);
}

async function playGasCloud(tokenId) {
	const token = canvas.tokens.get(tokenId)

	if (!token) { return; }

	await new Sequence()
	  .effect()
	  .file("jb2a.smoke.puff.ring.01.white")
	  .attachTo(token)
	  .tint("#6B5B3E") // aka "fart brown"
	  .opacity(0.65)
	  .scale(3.0)
	  .fadeIn(0)
	  .fadeOut(0)
	  .duration(1067)
	  .play(); 		
}

async function playFartMessage(tokenId, message) {
	await floatingTextOnToken(tokenId, message, 8000, "#6B5B3E", false);
}

async function cropDust(tokenId) {
	const token = canvas.tokens.get(tokenId)
	if (!token) { return; }
	const nearbyTokens = getTokensByTokenRadius(tokenId, 4);

	for (const token of nearbyTokens) {
		const reaction = randomItem(["🤢","😷","💀","🤮","😠","☣️"]);
		await brfbSocket.executeForEveryone("floatingTextOnToken", token.id, reaction, 8000);
		const users = getTokenOwners(token.id);
		for (const user of users) { 
			incrementPlayerCount(user.id, "crop_dusted_count");
		}
	}
}

async function commenceEpicFlatulence(tokenId, message) {
	// Gas Cloud
	await playGasCloud(tokenId);

	// Message
	await playFartMessage(tokenId, message);

	// Crop Dust
	await cropDust(tokenId);
}

export async function requestFlatulence(selectedTokenIds) {
	// One fart sound.
	await brfbSocket.executeForEveryone("playGlobalSound", randomItem(FART_SOUNDS));

	for (const tokenId of selectedTokenIds) {
		const message = randomItem(FART_MESSAGES);
		await commenceEpicFlatulence(tokenId, message);
		const users = getTokenOwners(tokenId);
		for (const user of users) {
			await incrementPlayerCount(user.id, "fart_count");
		}
	}
}